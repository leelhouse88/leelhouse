"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS for toastify
import Loading from "@/components/Loader/Loading";
export default function AddImage({ id }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/project/fetch-single/${id}`);
                setData(response.data.project);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleDeleteImage = async (index, type) => {
        try {
            const response = await axios.patch("/api/project/updateimage", {
                id,
                deleteFeatureImageIndex: type === 'Feature' ? index : undefined,
                deleteImageIndex: type === 'images' ? index : undefined,
            });
    
            console.log("Response from server:", response.data);  // Log server response for debugging
    
            setData(prevData => {
                if (type === 'Feature') {
                    return {
                        ...prevData,
                        featureImage: prevData.featureImage ? prevData.featureImage.filter((_, i) => i !== index) : [],
                    };
                } else if (type === 'images') {
                    return {
                        ...prevData,
                        images: prevData.images ? prevData.images.filter((_, i) => i !== index) : [],
                    };
                } else {
                    console.error('Unknown type:', type);
                    return prevData;
                }
            });
    
            toast.success(`${type === 'Feature' ? 'Feature' : 'images'} image deleted successfully`);
        } catch (error) {
            console.error(`Error deleting ${type.toLowerCase()} image:`, error);
            toast.error(`Failed to delete ${type.toLowerCase()} image: ${error.message}`);
        }
    };
    
    if (!data) {
        return <Loading/>;
    }

    return (
        <div className="p-4 space-y-6">
            {data.featureImage && data.featureImage.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-bold text-center py-2 mb-2 border-b">Feature Images ({data.featureImage.length})</h3>
                    <ul className="flex flex-wrap gap-4">
                        {data.featureImage.map((url, index) => (
                            <li key={index} className="relative flex items-center justify-center">
                                <Link href={url} target="_blank">
                                    <Image src={url} alt={`Feature Image ${index + 1}`} height={150} width={150} className="rounded-lg border border-gray-300" />
                                </Link>
                                <button
                                    onClick={() => handleDeleteImage(index, 'Feature')}
                                    className="absolute top-2 right-2  w-5 h-5 flex justify-center items-center bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700"
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {data.images && data.images.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-bold text-center py-2 mb-2 border-b">Images ({data.images.length})</h3>
                    <ul className="flex flex-wrap gap-4">
                        {data.images.map((url, index) => (
                            <li key={index} className="relative flex items-center justify-center">
                                <Link href={url} target="_blank">
                                    <Image src={url} alt={`Image ${index + 1}`} height={150} width={150} className="rounded-lg border border-gray-300" />
                                </Link>
                                <button
                                    onClick={() => handleDeleteImage(index, 'images')}
                                    className="absolute top-2 right-2  w-5 h-5 flex justify-center items-center bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700"
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
