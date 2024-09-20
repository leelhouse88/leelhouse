"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Input from '../Input/Input';
import toast, { Toaster } from 'react-hot-toast';

export default function AddCategory({ onServiceAdded }) {
    const [name, setname] = useState('');
    const [details, setdetails] = useState('');
    const [image, setImage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name && details && image) {
            setIsSubmitting(true);
            try {
                // Upload image to Cloudinary
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'your_cloudinary_preset'); // Replace with your Cloudinary upload preset

                const cloudinaryResponse = await axios.post('/api/project/upload', formData);
                const img = cloudinaryResponse.data.file.secure_url;

                // Store the service data with the image URL in your database
                await axios.post('/api/category/create', { name, details, img });

                setname('');
                setdetails('');
                setImage(null);
                toast.success("Category added successfully")
                onServiceAdded();

            } catch (error) {
                console.error('Error submitting service:', error);
                toast.error('Error submitting service');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const isFormValid = name && details && image;

    return (
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? 'Hide Form' : 'Show Form'}
            </button>
            <Toaster />
            {isVisible && (
                <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg flex flex-col gap-2 shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
                    <Input
                        label="Category Name"
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="mb-5"
                    />
                    <Input
                        label="Detail"
                        type="text"
                        value={details}
                        onChange={(e) => setdetails(e.target.value)}
                        className="mb-4"
                    />
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="border border-gray-300 p-2 w-full rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 mt-4 text-white py-2 px-4 rounded hover:bg-blue-600 ${!isFormValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isFormValid || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Service'}
                    </button>
                </form>
            )}
        </>
    );
}
