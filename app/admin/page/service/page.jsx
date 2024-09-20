"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';
import { toast } from 'react-toastify';

export default function ServiceRequests() {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [selectedStatus, setSelectedStatus] = useState('All');

    useEffect(() => {
        const fetchServiceRequests = async () => {
            try {
                const response = await axios.get('/api/service/fetchall/service');
                setServiceRequests(response.data.fetch);
                setFilteredRequests(response.data.fetch);
            } catch (err) {
                setError('Error fetching service requests');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceRequests();
    }, []);

    useEffect(() => {
        if (selectedStatus === 'All') {
            setFilteredRequests(serviceRequests);
        } else {
            setFilteredRequests(serviceRequests.filter(request => request.status === selectedStatus));
        }
        setCurrentPage(1); // Reset to first page when filter changes
    }, [selectedStatus, serviceRequests]);

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await axios.patch('/api/service/update', {
                id,
                status: newStatus
            });

            if (response.data.success) {
                toast.success("Service status updated successfully!");
                setServiceRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === id ? { ...request, status: newStatus } : request
                    )
                );
            } else {
                toast.error(response.data.message || "Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Error updating status.");
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-lg text-red-600">{error}</p>;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="mb-2 md:mb-0 flex gap-2 items-center">
                    <label htmlFor="statusFilter" className="text-gray-600 text-xs md:text-sm mr-2">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border rounded-md p-2 bg-white"
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="mb-2 md:mb-0">
                    <p className="text-gray-600 text-xs md:text-sm">
                        Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredRequests.length)} of {filteredRequests.length}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize" 
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button 
                        className="bg-blue-500 text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize"
                    >
                        {currentPage}
                    </button>
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            <h1 className="text-4xl font-semibold text-gray-900 mb-8">Service Requests</h1>

            {filteredRequests.length === 0 ? (
                <p className="text-lg text-gray-700">No service requests found.</p>
            ) : (
                <div className="space-y-4">
                    {currentItems.map(request => (
                        <div key={request._id} className="bg-white p-4 border border-gray-200 shadow-md rounded-lg">
                            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-gray-700 font-semibold">Requestor:</p>
                                    <p className="text-gray-600">{request.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Service Type:</p>
                                    <p className="text-gray-600">{request.servicetype}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Mobile:</p>
                                    <p className="text-gray-600">{request.mobile}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Date:</p>
                                    <p className="text-gray-600">{request.date}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-semibold">Status:</p>
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleUpdateStatus(request._id, e.target.value)}
                                        className="mt-2 border rounded-md p-1 bg-white"
                                    >
                                        <option value="Completed">Completed</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
