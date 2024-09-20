"use client";
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import axios from 'axios';

export default function Notification() {
  const [enquiryRequests, setEnquiryRequests] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNotificationListOpen, setIsNotificationListOpen] = useState(false);
  const [isNotificationDetailOpen, setIsNotificationDetailOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);

  // Toggle notification list
  const toggleNotificationList = () => {
    setIsNotificationListOpen(!isNotificationListOpen);
    setIsNotificationDetailOpen(false);
  };

  // Open notification details
  const openNotificationDetail = (notification) => {
    setSelectedNotification(notification);
    setIsNotificationDetailOpen(true);
    setIsNotificationListOpen(false);
  };

  // Close notification details and update its status
  const closeNotificationDetail = async () => {
    if (!selectedNotification) return;

    try {
      const updateEndpoint =
        selectedNotification.type === 'enquiry'
          ? "/api/Enquiry/update"
          : "/api/contactus/update";

      const response = await axios.patch(updateEndpoint, { id: selectedNotification._id });

      if (response.data.success) {
        window.location.reload();
        setIsNotificationDetailOpen(false);
      }
    } catch (err) {
      console.error("Error updating notification status:", err);
    }
  };

  // Fetch enquiry and contact requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fetch Enquiry Requests
        const enquiryResponse = await axios.get("/api/Enquiry/fetchall/enquiry");
        const sortedEnquiryRequests = enquiryResponse.data.fetch
          .filter(request => request.status === "0")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEnquiryRequests(sortedEnquiryRequests);

        // Fetch Contact Requests
        const contactResponse = await axios.get("/api/contactus/fetchall/contact");
        const sortedContactRequests = contactResponse.data.fetch
          .filter(request => request.status === "0")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setContactRequests(sortedContactRequests);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Fetch enquiry and contact counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch Enquiry Count
        const enquiryCountResponse = await fetch('/api/Enquiry/enquirycount/enquiry');
        const enquiryData = await enquiryCountResponse.json();
        if (enquiryData.success) {
          setEnquiryCount(enquiryData.count);
        }

        // Fetch Contact Count
        const contactCountResponse = await fetch('/api/contactus/count/contact');
        const contactData = await contactCountResponse.json();
        if (contactData.success) {
          setContactCount(contactData.count);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      {/* Notification Bell */}
      <div onClick={toggleNotificationList} className="items-center cursor-pointer ml-4 hidden md:block">
        <Bell color="#fff" size={20} />
        {(enquiryCount > 0 || contactCount > 0) && (
          <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {enquiryCount + contactCount}
          </span>
        )}
      </div>

      {/* Notification List */}
      {isNotificationListOpen && (
        <div className="absolute right-0 top-5 z-50 flex items-center justify-center">
          <div className=" w-80 rounded-md">
            <div className=" max-h-96 p-2 backdrop-blur-md rounded-md overflow-y-auto">
              {enquiryRequests.length > 0 ? (
                  enquiryRequests.map((item, index) => (
                      <div
                      key={index}
                      className="px-4 relative py-3 mb-1 cursor-pointer bg-white shadow-md border-b border-gray-200 last:border-none rounded-md hover:bg-gray-100 transition-colors duration-300 ease-in-out flex items-center space-x-3"
                      onClick={() => openNotificationDetail({ ...item, type: 'enquiry' })}
                      >
                      <p className=' text-white top-0 right-0 px-3 bg-2 h-4 flex items-center rounded-bl-lg text-[12px] absolute'>Enquiry</p>
                    <div className="text-gray-600">
                      <Bell size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.message}</p>
                      <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-600">No new enquiry notifications.</div>
              )}

              
              {contactRequests.length > 0 ? (
                contactRequests.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 relative py-3 mb-1 cursor-pointer bg-white shadow-md border-b border-gray-200 last:border-none rounded-md hover:bg-gray-100 transition-colors duration-300 ease-in-out flex items-center space-x-3"
                    onClick={() => openNotificationDetail({ ...item, type: 'contact' })}
                  >
                     <p className=' text-white top-0 right-0 px-3 bg-green-600 h-4 flex items-center rounded-bl-lg text-[12px] absolute'>Contact</p>
                    <div className="text-gray-600">
                      <Bell size={20} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.message}</p>
                      <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-600">No new contact notifications.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification Detail */}
      {isNotificationDetailOpen && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-4 rounded-md shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-black">Notification Details</h2>
            
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-800">Name: {selectedNotification.name}</p>
              <p className="text-sm text-gray-600">Message: {selectedNotification.message}</p>
              <p className="text-sm text-gray-600">Phone: {selectedNotification.phone}</p>
              <p className="text-sm text-gray-600">Email: {selectedNotification.email}</p>
              <p className="text-xs text-gray-400">Received: {new Date(selectedNotification.createdAt).toLocaleString()}</p>
             
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={closeNotificationDetail}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
