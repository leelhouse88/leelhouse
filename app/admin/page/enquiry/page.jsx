"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loader/Loading";
import Link from "next/link";
import { Link2, User, PhoneCall, Mail, MessageCircle, X } from "lucide-react";

export default function Page() {
  const [EnquiryRequests, setEnquiryRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null); // For Modal
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchEnquiryRequests = async () => {
      try {
        const response = await axios.get("/api/Enquiry/fetchall/enquiry");
        const sortedRequests = response.data.fetch.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEnquiryRequests(sortedRequests);
      } catch (err) {
        setError("Error fetching Enquiry requests");
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiryRequests();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = EnquiryRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(EnquiryRequests.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRequestClick = async (request) => {
  
   
    setSelectedRequest(request); 

    try {
      const response = await axios.patch("/api/Enquiry/update", { id: request._id });
      if (response.data.success) {
        // Optionally handle successful update, e.g., show a success message
      }
    } catch (err) {
     
    } finally {
     
    }
  };

  const handleCloseModal = () => {
    setSelectedRequest(null); 
    window.location.reload();
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-lg text-red-600">{error}</p>;

  return (
    <div className="p-4 sm:p-8 bg-gray-50">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <p className="text-gray-600 text-xs md:text-sm">
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, EnquiryRequests.length)} of {EnquiryRequests.length}
        </p>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-xs md:text-sm rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-[#0078db]/70 hover:bg-[#0078db] text-white"}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button className="bg-[#0078db] text-white rounded-md px-3 py-1 text-xs md:text-sm">
            {currentPage}
          </button>
          <button
            className={`px-3 py-1 text-xs md:text-sm rounded-md ${currentPage === totalPages ? "bg-gray-300" : "bg-[#0078db]/70 hover:bg-[#0078db] text-white"}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
  {currentItems.length === 0 ? (
    <p className="text-lg text-gray-700 p-4">No Enquiry found.</p>
  ) : (
    currentItems.map((request) => (
      <div
        key={request._id}
        className="border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => handleRequestClick(request)} // Trigger modal
      >
        <div className="text-lg font-semibold text-gray-800 mb-2">{request.projecttitle}</div>
        <div className="flex items-center gap-x-2 text-gray-600 mb-1">
          <User size={16} className="text-blue-500" />
          <span className="text-sm">{request.name}</span>
        </div>
        <div className="flex items-center gap-x-2 text-gray-600 mb-1">
          <PhoneCall size={16} className="text-green-500" />
          <span className="text-sm">{request.phone}</span>
        </div>
        <div className="flex items-center gap-x-2 text-gray-600 mb-1">
          <Mail size={16} className="text-red-500" />
          <span className="text-sm">{request.email}</span>
        </div>
        <div className="flex items-center gap-x-2 text-gray-600 mb-1">
          <MessageCircle size={16} className="text-yellow-500" />
          <span className="text-sm">
            {request.message.length > 50 ? `${request.message.slice(0, 50)}...` : request.message}
          </span>
        </div>
       
        <div className="flex items-center text-sm text-gray-500 mb-1">
          {request.status === "0" ? (
            <span className="bg-red-500 text-xs text-white px-2 font-semibold rounded">Unread</span>
          ) : (
            <span className="bg-green-500 text-xs text-white px-2 font-semibold rounded">Read</span>
          )}
        </div>
        <div className="flex bg-2 px-2 py-1 rounded-md items-center gap-x-2 text-white transition-colors duration-300">
          <Link2 size={16} className="text-white" />
          <Link href={`/admin/page/singlepage/${request.projectid}`}>
            View Project
          </Link>
        </div>
      </div>
    ))
  )}
</div>


      <div className="flex justify-between mt-6">
        <p className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Modal for showing details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedRequest.projecttitle}</h2>
            <p><strong>Name:</strong> {selectedRequest.name}</p>
            <p><strong>Phone:</strong> {selectedRequest.phone}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Message:</strong> {selectedRequest.message}</p>
            <p><strong>Enquiry Date</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
            <div className="flex mt-4">
              <Link href={`/admin/page/singlepage/${selectedRequest.projectid}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                View Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
