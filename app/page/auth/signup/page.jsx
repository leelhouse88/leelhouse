"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '@/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from "firebase/auth"
export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        mobile: '',
        email: '',
        general: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [otp, setOtp] = useState('');
    const [ph, setPh] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);
    const router = useRouter();
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };



    const validate = () => {
        const mobileRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const errors = {
            mobile: mobileRegex.test(formData.mobile.replace(/\D/g, '')) ? '' : 'Invalid mobile number',
            email: emailRegex.test(formData.email) ? '' : 'Invalid email address',
            general: ''
        };

        setErrors(errors);
        return !Object.values(errors).some(Boolean);
    };

    const isFormValid = () => {
        return Object.values(formData).every(field => field.trim() !== '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);

        try {
            const response = await axios.post('/api/admin/signup', formData);

            if (response.status === 201) {
                toast.success("registered successfully!");
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
                    password: ''
                });
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    general: response.data.message || 'An error occurred. Please try again.'
                }));
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setErrors(prevErrors => ({
                ...prevErrors,
                general: error.response?.data?.message || 'An error occurred while submitting the form. Please try again.'
            }));
        } finally {
            setSubmitting(false);
        }
    };


    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: "invisible",
                callback: (response) => {
                    onSignup();
                },
                "expired-callback": () => { },
            },
                auth
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(res.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <>
            <Toaster />
            <Navbar />
            
            <title>Sign Up In LEEL House</title>
            <div className='bg-banner px-1 md:px-0 relative z-10 flex justify-center items-end md:items-center min-h-screen'>
                <div className='absolute inset-0 bg-opacity-50 backdrop-blur-md z-20'></div>

                <div id='recaptcha-container'>

                </div>
                {/* {
                    !user ?
                        <div className='z-30 bg-white p-8 rounded-lg shadow-2xl max-w-md w-full'>
                            <h2 className='text-4xl font-bold mb-8 text-center text-gray-800'>Enter Mobile Number</h2>


                            {showOTP ?
                                <div className=' flex flex-col justify-center gap-4'>

                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span className="mx-2 text-gray-600">-</span>}
                                        renderInput={(props) => (
                                            <input
                                                {...props}
                                                className="w-10 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
                                            />
                                        )}
                                    />
                                    <button className=' bg-2 px-4 py-2 rounded-md text-white'>Verify OTP</button>

                                </div> :

                                <div className=' flex flex-col justify-center gap-4'>


                                    <PhoneInput
                                        country={"in"}
                                        value={ph}
                                        onChange={setPh}
                                    />

                                    <button onClick={onSignup} className=' bg-2 px-4 py-2 rounded-md text-white'>Send OTP </button>

                                </div>

                            }





                        </div>
                        : */}

                <div className='z-30 bg-white p-8 rounded-lg shadow-2xl max-w-md w-full'>
                    <h2 className='text-4xl font-bold mb-8 text-center text-gray-800'>Sign Up</h2>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {errors.general && <p className='bg-red-500 font-semibold rounded-md text-center text-white text-sm mb-4'>{errors.general}</p>}

                        <div className='w-full'>
                            <label className='block text-lg font-semibold mb-2 text-gray-700' htmlFor="name">
                                Name
                            </label>
                            <input
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#005ca8] hover:shadow-lg bg-gray-100'
                                placeholder="Enter your name"
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div className='w-full'>
                            <label className='block text-lg font-semibold mb-2 text-gray-700' htmlFor="mobile">
                                Mobile Number
                            </label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#005ca8] hover:shadow-lg bg-gray-100`}
                                placeholder="Enter your mobile number"
                                type="tel"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                disabled={submitting}
                            />
                            {errors.mobile && <p className='text-red-500 text-sm mt-1'>{errors.mobile}</p>}
                        </div>


                        <div className='w-full'>
                            <label className='block text-lg font-semibold mb-2 text-gray-700' htmlFor="email">
                                Email
                            </label>
                            <input
                                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#005ca8] hover:shadow-lg bg-gray-100`}
                                placeholder="Enter your email"
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={submitting}
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                        </div>

                        <div className='w-full'>
                            <label className='block text-lg font-semibold mb-2 text-gray-700' htmlFor="password">
                                Password
                            </label>
                            <input
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#005ca8] hover:shadow-lg bg-gray-100'
                                placeholder="Enter your password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={submitting}
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={!isFormValid() || submitting}
                            className={`w-full py-2 px-4 rounded-lg shadow-lg transform transition duration-300 ease-in-out ${isFormValid() && !submitting ? 'bg-[#005ca8] text-white hover:bg-[#8c6d45] hover:scale-105' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                } focus:outline-none focus:ring-2 focus:ring-[#005ca8]`}>
                            {submitting ? 'Submitting...' : 'Sign Up'}
                        </button>

                        <Link href="/page/auth/login" className='block text-center text-sm text-gray-700 hover:text-gray-900 mt-4'>
                            Already have an account? <span className='text-[#005ca8] font-semibold'>Sign In</span>
                        </Link>
                    </form>
                </div>
                {/* } */}







            </div>
        </>
    );
}
