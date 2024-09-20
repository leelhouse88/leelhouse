"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';

export default function MetaData() {
    const [metadata, setMetadata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '' });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await axios.get('/api/metadata/fetchall/metadata');
                setMetadata(response.data.fetch);
            } catch (err) {
                setError('Error fetching metadata');
            } finally {
                setLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setFormData({ title: item.title, description: item.description });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/api/metadata/update`, {
                id: selectedItem._id,
                ...formData,
            });
            
            if (response.data.success) {
                setMetadata((prevMetadata) =>
                    prevMetadata.map((item) =>
                        item._id === selectedItem._id ? { ...item, ...formData } : item
                    )
                );
                setSelectedItem(null);
            } else {
                setError(response.data.message || 'Error updating metadata');
            }
        } catch (err) {
            setError('Error updating metadata');
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-lg text-red-600">{error}</p>;

    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Metadata List</h1>
                {metadata.map((item) => (
                 <div
                 key={item._id}
                 className="bg-white shadow-xl rounded-lg p-6 mb-6 cursor-pointer hover:ring-2"
                 onClick={() => handleItemClick(item)}
             >
                 <div className="text-xl font-bold text-gray-800 mb-2">
                     {item.page} Page
                 </div>
                 <div className="text-gray-700 mb-2">
                     <span className='text-gray-900 font-semibold'>Title:</span> {item.title}
                 </div>
                 <div className="text-gray-700">
                     <span className='text-gray-900 font-semibold'>Description:</span> {item.description}
                 </div>
             </div>
             
                ))}
            </div>

            {selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <form
                        onSubmit={handleFormSubmit}
                        className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">Update Metadata</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedItem(null)}
                                className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
