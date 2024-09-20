"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image';
import Loading from "@/components/Loader/Loading";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";

export default function Card() {
    const [offers, setOffers] = useState([]);
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/offer/getdata/offer");
                setOffers(response.data.fetch);
                setError(false);
            } catch (error) {
                console.error("Error fetching offers:", error);
                toast.error("Error fetching offers. Please try again later.");
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    useEffect(() => {
        const fetchProjectDetails = async (productid) => {
            try {
                const response = await axios.get(`/api/Wishlist/find-projectbyid/${productid}`);
                setProjects(prevProjects => ({
                    ...prevProjects,
                    [productid]: response.data
                }));
            } catch (err) {
                console.error('Error fetching project details:', err);
            }
        };

        // Fetch project details for each unique productid in offers
        offers.forEach(item => {
            if (!projects[item.productid]) {
                fetchProjectDetails(item.productid);
            }
        });
    }, [offers, projects]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-red-500">An error occurred. Please try again later.</p>;
    }

    if (offers.length === 0) {
        return <p className="text-gray-500">No offers available at the moment.</p>;
    }

    return (
        <>
            <ToastContainer />
            {offers.map((item, index) => {
                const projectDetails = projects[item.productid] || {}; // Get project details for the current item
                const imageUrl = projectDetails.featureImage ? projectDetails.featureImage[0] : null;

                return (
                    <Link key={index}  href={`/properties/${projectDetails.slug}`}>
                        <div className="mb-4">
                            <div className="relative z-20 h-44 rounded-lg overflow-hidden">
                                {imageUrl ? (
                                    <Image
                                        alt={item.type}
                                        className='object-cover h-52 w-full'
                                        src={imageUrl}
                                        fill
                                    />
                                ) : (
                                    <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">Loading image...</div>
                                )}
                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black"></div>
                                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-100 text-white z-30 hover:opacity-0 hover:bg-transparent bg-black/50 backdrop-blur-sm hover:backdrop-blur-0 duration-300">
                                    <p className='text-2xl font-bold transform transition-transform duration-300 animate-pulse'>
                                        {item.type}
                                    </p>
                                </div>

                                <div className='p-4 absolute bottom-0 left-0 right-0 text-white'>
                                    <h4 className='font-semibold text-sm mb-2'>
                                        {projectDetails.price || 'Price not available'}
                                    </h4>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p className='text-xs'>{projectDetails.propertyname || 'Property name not available'}</p>
                                            <p className='text-xs'>
                                                {projectDetails.address
                                                    ? `${projectDetails.address.houseNumber} ${projectDetails.address.colony} ${projectDetails.address.area} ${projectDetails.address.city} ${projectDetails.address.pincode}`
                                                    : 'Address not available'}
                                            </p>
                                        </div>
                                        <div>
                                            <button className='border rounded text-xs px-2 py-1 hover:bg-gray-700 transition-colors'>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}
