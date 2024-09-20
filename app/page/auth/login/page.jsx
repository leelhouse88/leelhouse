"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const isFormValid = () => {
        return Object.values(formData).every(field => field.trim() !== '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userData = await fetchUserData(formData.email);
            console.log(userData)
            if (!userData) {
                setError('No user found with this email.');
                setLoading(false);
                return;
            }



            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                setLoading(false);
                return;
            }


            if (userData.usertype == "2") {
                router.push('/admin');
                setLoading(false);
            } else if (userData.usertype == "1") {
                router.push('/user');
                setLoading(false);
            }

           
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError('Server error: ' + (error.response.data.message || 'An error occurred.'));
            } else {
                setError('Invalid Credentials. Please try again.');
            }
            setLoading(false);
        }
    };

    const fetchUserData = async (email) => {
        try {
            const response = await axios.get(`/api/admin/find-admin-byemail/${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            setLoading(false);
            setError('Failed to fetch user data. Please try again later.');
            return null;
        }
    };

    return (
        <>
            <Navbar />
            <title>Login In LEEL House</title>
            <div className='bg-banner flex justify-center items-center min-h-screen'>
                <div className='absolute inset-0 bg-opacity-50 backdrop-blur-sm'></div>

                <div className='relative z-30 bg-white p-10 rounded-xl shadow-2xl max-w-md w-full'>
                    <h2 className='text-4xl font-bold mb-8 text-center text-gray-800'>Sign In</h2>

                    {error && (
                        <div className="text-red-600 text-center mb-4 animate-bounce">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='w-full'>
                            <label className='block text-lg font-medium text-gray-700 mb-2' htmlFor="email">
                                Email
                            </label>
                            <input
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#005ca8] hover:shadow-md bg-gray-100'
                                placeholder="Enter your email"
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className='w-full'>
                            <label className='block text-lg font-medium text-gray-700 mb-2' htmlFor="password">
                                Password
                            </label>
                            <input
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#005ca8] hover:shadow-md bg-gray-100'
                                placeholder="Enter your password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={!isFormValid() || loading}
                            className={`w-full py-2 px-4 rounded-lg shadow-lg transform transition duration-300 ease-in-out ${isFormValid() ? 'bg-[#005ca8] text-white hover:bg-[#005ca8] hover:scale-105' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                } focus:outline-none focus:ring-2 focus:ring-[#005ca8]`}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <Link href="/page/auth/signup" className='block text-center text-sm text-gray-700 hover:text-gray-900 mt-4'>
                            Don&apos;t have an account? <span className='text-2 font-semibold'>Sign Up</span>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}
