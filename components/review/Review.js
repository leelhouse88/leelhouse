import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Review({ projectid }) {
    const [formData, setFormData] = useState({
        projectid: projectid, // Remove unnecessary object wrapping
        name: '',
        email: '',
        review: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError(''); // Clear previous error message

        try {
            await axios.post('/api/Review/create', {
                projectid: formData.projectid, // Use the correct value
                name: formData.name,
                email: formData.email,
                review: formData.review,
                defaultdata: 'Review',
            });
            toast.success(`Thank you, ${formData.name || 'valued reviewer'}, for your feedback! We appreciate it!`);

            setFormData({ ...formData, review: '' }); // Clear the review field after submission
        } catch (err) {
            console.error('Error submitting review:', err);
            setError(err.response?.data?.message || 'Error submitting the review.'); // Better error handling
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" p-4 bg-white shadow-md rounded-lg max-w-lg border">
            <Toaster />
            <h1 className="text-lg font-semibold text-gray-800 mb-4 font-sans">Submit Your Review</h1>
            {success && (
                <p className={`text-center mb-2 text-xs ${success.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {success}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row justify-between gap-x-2'>
                    <div className="mb-3 md:w-1/2">
                        <label className="block text-gray-700 text-sm mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-150 ease-in-out"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-3 md:w-1/2">
                        <label className="block text-gray-700 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-150 ease-in-out"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm mb-1">Review</label>
                    <textarea
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-150 ease-in-out text-sm"
                        rows="4"
                        placeholder="Write your review..."
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#005ca8] text-white font-semibold py-2 rounded-md text-sm transition duration-150 ease-in-out ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700'}`}
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
