"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Ani from '@/components/button/ani';
import Radio from '../input/Radio';
import Input from '@/app/admin/components/Input/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Postproperty() {
    const [formData, setFormData] = useState({
        propertytype: '',
        purpose: '',
        mobileNumber: '',
        name: '',
        city: ''
    });
    
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const isValid = 
            formData.propertytype &&
            formData.purpose &&
            formData.mobileNumber &&
            formData.name &&
            formData.city;
        setIsFormValid(isValid);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/postproperty/create', formData);
            if(response.status === 200){
                toast.success("Your Requiest is Submitted successfully! We'll contact you soon.");

                setFormData({
                    propertytype: '',
                    purpose: '',
                    mobileNumber: '',
                    name: '',
                    city: ''
                });
            } else {
                toast.error("Error: Unable to Submit property requiest.");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to post property.');
        }
    };

    return (
        <div className="bg-white border p-6 rounded-lg shadow-lg mx-auto ">
            <ToastContainer />
            <div className="relative inline-block mb-6">
                <h1 className="text-xl text-[#005ca8] font-bold">Post Property</h1>
                <div className="absolute -top-4 -right-4">
                    <Ani />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold text-gray-700">Property Type</h2>
                        <div className="flex gap-6">
                            <Radio
                                name="propertytype"
                                value="Residential"
                                id="1"
                                checked={formData.propertytype === 'Residential'}
                                onChange={handleChange}
                            />
                            <Radio
                                name="propertytype"
                                value="Commercial"
                                id="2"
                                checked={formData.propertytype === 'Commercial'}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold text-gray-700">Looking to</h2>
                        <div className="flex gap-6">
                            <Radio
                                name="purpose"
                                value="Rent"
                                id="3"
                                checked={formData.purpose === 'Rent'}
                                onChange={handleChange}
                            />
                            <Radio
                                name="purpose"
                                value="Sell"
                                id="4"
                                checked={formData.purpose === 'Sell'}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            type="text"
                            name="mobileNumber"
                            placeholder="Enter Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                        />
                        <Input
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Input
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`mt-6 w-full py-3 px-4 rounded-md ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
                    disabled={!isFormValid}
                >
                    Start Now!
                </button>
            </form>
        </div>
    );
}
