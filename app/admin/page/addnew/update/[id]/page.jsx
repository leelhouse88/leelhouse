"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import AddImage from '@/app/admin/components/image/AddImage';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
export default function Update({ params }) {
    const id = params.id;
    const [featureImages, setFeatureImages] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [featureImagePreviews, setFeatureImagePreviews] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleFeatureImagesChange = (event) => {
        const files = Array.from(event.target.files);
        setFeatureImages(prev => [...prev, ...files]);
        setFeatureImagePreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
    };

    const handleImagesChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
    };

    const handleDeleteFeatureImage = (index) => {
        setFeatureImages(prev => prev.filter((_, i) => i !== index));
        setFeatureImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleDeleteImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        setUploading(true);

        const uploadFile = async (file) => {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post("/api/project/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data.file.secure_url || response.data.file.url;
            } catch (error) {
                if (error.response) {

                    console.error('Error uploading file:', error.response.data.message || error.response.data);
                    toast.error(`Upload failed: ${error.response.data.message || 'Unknown error'}`);
                } else if (error.request) {

                    console.error('Error uploading file: No response received');
                    toast.error('Upload failed: No response from server');
                } else {

                    console.error('Error uploading file:', error.message);
                    toast.error(`Upload failed: ${error.message}`);
                }
                return null;
            }
        };

        const uploadFeatureImageUrls = [];
        for (const file of featureImages) {
            const fileUrl = await uploadFile(file);
            if (fileUrl) uploadFeatureImageUrls.push(fileUrl);
        }

        const uploadedImageUrls = [];
        for (const file of images) {
            const fileUrl = await uploadFile(file);
            if (fileUrl) uploadedImageUrls.push(fileUrl);
        }

        try {
            const response = await axios.patch("/api/project/updateimage", {
                id,
                featureImage: uploadFeatureImageUrls,
                images: uploadedImageUrls,
            });
            if (response.status === 200) {
                toast.success("Images uploaded successfully");
            }
        } catch (error) {
            if (error.response) {

                console.error('Error updating project:', error.response.data.message || error.response.data);
                toast.error(`Update failed: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {

                console.error('Error updating project: No response received');
                toast.error('Update failed: No response from server');
            } else {

                console.error('Error updating project:', error.message);
                toast.error(`Update failed: ${error.message}`);
            }
        } finally {
            setFeatureImages([]);
            setImages([]);
            setFeatureImagePreviews([]);
            setImagePreviews([]);
            setUploading(false);

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="">

                <div className='  overflow-hidden'>
                    <div className=" items-center justify-center p-6 bg-gray-100">

                        <div className=' flex justify-end'>
                            <Link href={`../update2/${id}`}>
                            
                            <div className=' flex items-center justify-center bg-2 text-white font-semibold px-4 rounded-md'>Details <ArrowRight width={20} /></div>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Upload and Manage Your Images</h1>

                        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
                            <div className="">
                                <label className="block text-lg font-medium text-gray-700 mb-2">Feature Images:</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFeatureImagesChange}
                                    disabled={uploading}
                                    className=" file:border-0 border rounded-md file:bg-blue-600 file:text-white"
                                />
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {featureImagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <Image src={preview} alt={`Feature preview ${index}`} width={10} height={10} className=" h-28 w-28 object-cover rounded-md border border-gray-300 shadow-sm" />
                                            <button
                                                onClick={() => handleDeleteFeatureImage(index)}
                                                disabled={uploading}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 w-5 h-5 flex justify-center items-center rounded-full shadow-md hover:bg-red-700"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="block text-lg font-medium text-gray-700 mb-2">Additional Images:</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImagesChange}
                                    disabled={uploading}
                                    className=" file:border-0 border rounded-md file:bg-blue-600 file:text-white"
                                />
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <Image src={preview} alt={`Image preview ${index}`} width={10} height={10} className=" h-28 w-28 object-cover rounded-md border border-gray-300 shadow-sm" />
                                            <button
                                                onClick={() => handleDeleteImage(index)}
                                                disabled={uploading}
                                                className="absolute top-2 right-2 bg-red-600  w-5 h-5 flex justify-center items-center text-white p-1 rounded-full shadow-md hover:bg-red-700"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className={`py-1 px-6  w-full    text-white font-semibold rounded-md flex items-center justify-center ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {uploading ? (
                                    <div className="flex items-center">
                                        <svg
                                            className="animate-spin h-6 w-6 text-white mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.71 1.11 5.17 2.906 6.906l1.094-1.615z"
                                            ></path>
                                        </svg>
                                        Uploading...
                                    </div>
                                ) : (
                                    'Upload'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='  border'>
                    <AddImage id={`${id}`} />
                </div>
            </div>

        </>
    );
}
