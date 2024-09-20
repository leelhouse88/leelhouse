"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';
import Image from 'next/image';
import Link from 'next/link';

export default function PropertyPostRequest() {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust this number based on how many items you want per page

    // Sorting state
    const [sortOrder, setSortOrder] = useState('latest'); // Default to 'latest'

    // Filtering state
    const [filterPurpose, setFilterPurpose] = useState('all'); // Default to 'all'

    useEffect(() => {
        const fetchServiceRequests = async () => {
            try {
                const response = await axios.get('/api/postproperty/fetchall/porpery');
                setServiceRequests(response.data.fetch);
            } catch (err) {
                setError('Error fetching service requests');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceRequests();
    }, []);

    // Filter and sort the data
    const filteredServiceRequests = serviceRequests.filter((request) => {
        return filterPurpose === 'all' || request.purpose === filterPurpose;
    });

    const sortedServiceRequests = [...filteredServiceRequests].sort((a, b) => {
        const createdAtA = new Date(a.createdAt).getTime(); // Convert createdAt to milliseconds
        const createdAtB = new Date(b.createdAt).getTime(); // Convert createdAt to milliseconds

        if (sortOrder === 'latest') {
            return createdAtB - createdAtA;
        } else {
            return createdAtA - createdAtB;
        }
    });

    // Calculate the total pages
    const totalPages = Math.ceil(sortedServiceRequests.length / itemsPerPage);

    // Determine the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedServiceRequests.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterPurpose(e.target.value);
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-lg text-red-600">{error}</p>;

    return (
        <>
            <div className="p-4 min-h-screen">
                <div className=" grid lg:grid-cols-3 grid-cols-2 mb-4">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <label htmlFor="sortOrder" className="text-gray-600 hidden lg:block text-sm md:text-base">Sort By:</label>
                        <select
                            id="sortOrder"
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm md:text-base"
                        >
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <label htmlFor="filterPurpose" className="text-gray-600 hidden lg:block text-sm md:text-base">Filter By Purpose:</label>
                        <select
                            id="filterPurpose"
                            value={filterPurpose}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm md:text-base"
                        >
                            <option value="all">All</option>
                            <option value="Rent">Rent</option>
                            <option value="Sell">Sell</option>
                        </select>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <p className="text-gray-600 text-xs md:text-sm">
                            Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedServiceRequests.length)} of {sortedServiceRequests.length}
                        </p>
                        <div className="flex justify-between md:justify-end w-full md:w-fit flex-row md:items-center gap-y-2 md:gap-x-4">
                            <div className="flex gap-1 md:gap-2 mt-2 md:mt-0">
                                <button
                                    className="bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                <button
                                    className="bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize"
                                >
                                    {currentPage}
                                </button>
                                <button
                                    className="bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4  bg-gray-100 min-h-screen">
                    {currentItems.length === 0 ? (
                        <p className="text-lg text-gray-700">No service requests found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map((request, index) => (
                                <div
                                    key={index}
                                    className="bg-white border relative border-gray-200 rounded-lg shadow-md p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.name}</h3>
                                    <div className="text-sm text-gray-700 mb-1 grid grid-cols-2">
                                        <div>  <strong>City</strong></div>
                                        <div> {request.city}</div>
                                    </div>
                                    <div className="text-sm text-gray-700 mb-1 grid grid-cols-2 items-center">
                                        <div>   <strong>Mobile Number</strong></div>
                                        <div className="flex items-center gap-2">

                                            {request.mobileNumber}


                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-700 mb-1 grid grid-cols-2">
                                        <div> <strong>Property Type</strong></div>
                                        <div>{request.propertytype}</div>
                                    </div>
                                    <div className="text-sm text-gray-700 grid grid-cols-2">
                                        <div> <strong>Buy/Sell</strong></div>
                                        <div>{request.purpose}</div>
                                    </div>

                                    <Link
                                        href={`https://wa.me/${request.mobileNumber}`}
                                        target='_blank'
                                        className=' absolute bottom-0 right-0'
                                    >

                                        <Image src="/image/whatsapp.webp" alt='WhatsApp' width={30} height={30} />

                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}
