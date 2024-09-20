"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';

export default function Page() {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchServiceRequests = async () => {
            try {
                const response = await axios.get('/api/contactus/fetchall/contact');
                setServiceRequests(response.data.fetch.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (err) {
                setError('Error fetching service requests');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceRequests();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = serviceRequests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(serviceRequests.length / itemsPerPage);

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

    const handleShowModal = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleCloseModal = async (request) => {
        setShowModal(false);
        setSelectedRequest(null);
        if (!selectedRequest) return; 
        try {
            const response = await axios.patch("/api/contactus/update", { id: selectedRequest._id });
            
            if (response.data.success) {
         
              window.location.reload();
        
              setIsNotificationDetailOpen(false); 
            }
          } catch (err) {
            console.error("Error updating notification status:", err);
          }
        };

    const handleDelete = async () => {
        if (selectedRequest) {
            try {
                await axios.delete(`/api/contactus/delete/${selectedRequest._id}`);
                
                // Update state to remove the deleted request
                const updatedRequests = serviceRequests.filter((req) => req._id !== selectedRequest._id);
                setServiceRequests(updatedRequests);
                
                // Adjust the current page if needed
                if (currentPage > Math.ceil(updatedRequests.length / itemsPerPage)) {
                    setCurrentPage(Math.ceil(updatedRequests.length / itemsPerPage));
                }
                
                handleCloseModal();
            } catch (err) {
                setError('Error deleting service request');
            }
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-lg text-red-600">{error}</p>;

    return (
        <div className="p-4 sm:p-8 bg-gray-50">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div className="mb-2 md:mb-0">
                    <p className="text-gray-600 text-xs md:text-sm">
                        Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, serviceRequests.length)} of {serviceRequests.length}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        className={`px-3 py-1 text-xs md:text-sm rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#0078db]/70 hover:bg-[#0078db] text-white'
                            }`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button className="bg-[#0078db] text-white rounded-md px-3 py-1 text-xs md:text-sm">
                        {currentPage}
                    </button>
                    <button
                        className={`px-3 py-1 text-xs md:text-sm rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#0078db]/70 hover:bg-[#0078db] text-white'
                            }`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="">
                {currentItems.length === 0 ? (
                    <p className="text-lg text-gray-700 p-4">No Contact requests found.</p>
                ) : (
                    <div className="">
                        {currentItems.map((request) => (
                            <div
                                key={request._id}
                                onClick={() => handleShowModal(request)}
                                className="bg-white shadow-md rounded-lg border border-gray-200 mb-4 cursor-pointer hover:shadow-lg"
                            >
                                <div className="flex items-center p-4">
                                    <div className="flex-1">
                                       <div className=" flex gap-2 items-end">
                                       <div className="text-lg font-semibold text-gray-900">Name : {request.name}</div>
                                   
                                       </div>
                                        <div className="text-sm text-gray-600">Mobile : {request.mobilenumber}</div>
                                        <div className="text-sm text-gray-600 mt-2 truncate">
                                            Description: {request.message.length > 20 ? `${request.message.slice(0, 20)}...` : request.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-6">
                <p className="text-xs text-gray-500">
                    Page {currentPage} of {totalPages}
                </p>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg shadow-lg  mx-4 md:mx-0 relative">
                        <div className="p-4 border-b border-gray-200">
                        
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
                                onClick={handleCloseModal}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        {selectedRequest && (
                            <div className="p-4">
                                <p><strong>Name: </strong> {selectedRequest.name}</p>
                                <p><strong>Email: </strong> {selectedRequest.email}</p>
                                <p><strong>Mobile Number: </strong> {selectedRequest.mobilenumber}</p>
                                <p><strong>Message: </strong> {selectedRequest.message}</p>
                            </div>
                        )}
                        <div className="p-4 border-t border-gray-200 flex justify-end">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-xs md:text-sm"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-4 py-2 text-xs md:text-sm"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
