import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import toast, { Toaster } from 'react-hot-toast';

export default function Enquiry({ item }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        projectid: item._id,
        projecttitle: item.propertyname,
    });
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { name, phone, email, message } = formData;
        setIsFormValid(name && phone && email && message && phone.length >= 10);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, phone: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid || loading) return;

        setLoading(true);
        try {
            const response = await axios.post('/api/Enquiry/Create', formData);
            if (response.status === 200 && response.data.success) {
                toast.success("Enquiry submitted successfully!");
                setFormData({ name: '', phone: '', email: '', message: '', projectid: item._id,  projecttitle: item.propertyname,   });
            } else {
                throw new Error('Unexpected response');
            }
        } catch (error) {
            toast.error("Failed to submit enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center p-4 items-center gap-4 bg-[#005ca8] rounded-t-lg shadow-lg border border-gray-200 max-w-md mx-auto">
                {/* <div className="rounded-full text-white p-2 bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
                    <Phone size={20} />
                </div> */}
                <div className="font-semibold font-sans text-lg capitalize text-white text-center">
                    {item.propertyname}
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-lg border border-gray-200 max-w-md mx-auto">
                <Toaster />
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <PhoneInput
                            country={'in'}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputStyle={{
                                width: '100%',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your Message"
                            rows="3"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={`w-full bg-2 text-white py-2 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${(!isFormValid || loading) && 'opacity-50 cursor-not-allowed'}`}
                        >
                            {loading ? 'Submitting...' : 'Send Enquiry'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
