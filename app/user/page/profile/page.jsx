"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import Loading from '@/components/Loader/Loading';

export default function Profile() {
    const { data: session, status } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    const useremail = session?.user?.email;

    useEffect(() => {
        if (useremail) {
            axios.get(`/api/admin/find-admin-byemail/${useremail}`)
                .then(response => {
                    setUserData(response.data);
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        mobile: response.data.mobile,
                        password: ''
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                });
        }
    }, [useremail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData) return;

        const userId = userData._id;

        try {
            await axios.patch(`/api/admin/update/${userId}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Fetch updated user data
            const response = await axios.get(`/api/admin/find-admin-byemail/${useremail}`);
            setUserData(response.data);
            setFormData({
                name: response.data.name,
                email: response.data.email,
                mobile: response.data.mobile,
                password: ''
            });

            alert('User updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
            alert('Failed to update user');
        }
    };

    if (status === 'loading' || loading) {
        return <Loading />;
    }

    if (!userData) {
        return <p>No user data available</p>;
    }

    return (
        <div className="p-4 mx-auto bg-white rounded-lg shadow-lg">

            <div className=" grid lg:grid-cols-5 items-center">
                <div className='p-2 lg:col-span-1 bg-1 rounded-md'>
                    <Image
                        src="/logo/Group 349 (1).svg"
                        alt="User Avatar"
                        width={200}
                        height={200}
                        
                    />
                </div>
                <div className=' lg:col-span-4 flex justify-between w-full'>
                    <div className="ms-4 flex-1">
                        <h1 className="text-2xl font-semibold text-gray-800">{userData.name}</h1>
                        <p className="text-gray-600">{userData.email}</p>
                        {userData.mobile && <p className="text-gray-600">{userData.mobile}</p>}
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-150"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <Edit2 size={24} />
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h2 className="text-lg font-semibold mb-2">Edit Profile</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                disabled
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-150"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
