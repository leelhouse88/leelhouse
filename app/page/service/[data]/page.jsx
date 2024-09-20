"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactUs from '@/components/card/contactus/ContactUs';
import Input from '@/app/admin/components/Input/Input';
import axios from 'axios';
import Service from '@/components/service/Service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Loading from '@/components/Loader/Loading';
export default function Page({ params }) {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [city, setCity] = useState([]);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        userid: '',
        name: '',
        mobile: '',
        city: '',
        servicetype: '',
        address: '',
        description: '',
        date: '',
        time: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [metadata, setMetadata] = useState([]);

    const [serviceType, serviceLocation] = decodeURIComponent(params.data).split(',');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session?.user?.email) {
                    const userResponse = await axios.get(`/api/admin/find-admin-byemail/${session.user.email}`);
                    setUserData(userResponse.data._id);
                    setFormData(prevData => ({
                        ...prevData,
                        userid: userResponse.data._id,
                        city: serviceLocation,
                        servicetype: serviceType
                    }));
                }

                const cityResponse = await axios.get("/api/project/findallcity/project");
                setCity(cityResponse.data.cities);

                const servicesResponse = await axios.get('/api/AddService/getdata/addservice');
                setServices(servicesResponse.data.fetch);

                const metadataResponse = await axios.get('/api/metadata/fetchall/metadata');
                setMetadata(metadataResponse.data.fetch);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [session?.user?.email, serviceLocation, serviceType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userid) {
            toast.error("Please log in to submit a service request.");
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await axios.post('/api/service/create', formData);
            if (response.status === 200) {
                setFormData({
                    userid: "",
                    name: '',
                    mobile: '',
                    city: serviceLocation,
                    servicetype: serviceType,
                    address: '',
                    description: '',
                    date: '',
                    time: ''
                });
                toast.success("Request Sent Successfully");
                window.location.reload();
            }
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: 'An error occurred while submitting the request. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const filteredMetadata = metadata.filter(item => item.page === 'Service');

    return (
        <>
            <Navbar />
            {filteredMetadata.map((item) => (
                <React.Fragment key={item._id}>
                    <title>{item.title}</title>
                    <meta name="description" content={item.description} />
                </React.Fragment>
            ))}
            <ToastContainer />
            <div className="bg-gray-50 bgblue pt-20">
                <div className="container mx-auto lg:w-[90%] py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="sticky top-20">
                                <ContactUs />
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                            {isLoading ? (
                               <Loading/>
                            ) : formData.userid ? (
                                <>
                                    <h2 className="text-3xl font-bold text-gray-800 my-8">Request a Service</h2>
                                    <form className="space-y-4" onSubmit={handleSubmit}>
                                        <div className="grid gap-8 md:grid-cols-2">
                                            <div>
                                                <Input
                                                    label="Name"
                                                    name="name"
                                                    className="text-lg"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div>
                                                <Input
                                                    label="Mobile Number"
                                                    className="text-lg"
                                                    type="number"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-800 mb-2">City</label>
                                                <select
                                                    name="city"
                                                    className="block h-12 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select City</option>
                                                    {city.map((item) => (
                                                        <option key={item._id} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="servicetype" className="block text-sm font-medium text-gray-800 mb-2">Service Type</label>
                                                <select
                                                    name="servicetype"
                                                    className="block w-full h-12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                                                    value={formData.servicetype}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Service</option>
                                                    {isLoading ? (
                                                        <li className="px-4 py-2 text-sm font-medium text-gray-700">...</li>
                                                    ) : (
                                                        services.map((service, index) => (
                                                            <option key={index} value={service.title}>{service.title}</option>
                                                        ))
                                                    )}
                                                </select>
                                            </div>

                                            <div className='md:col-span-2'>
                                                <Input
                                                    label="Address"
                                                    name="address"
                                                    placeholder="111 Extension, City"
                                                    className="text-lg"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className='md:col-span-2'>
                                                <Input
                                                    label="Description"
                                                    type="textarea"
                                                    name="description"
                                                    placeholder="Describe your request"
                                                    className="text-lg"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className='md:col-span-2'>
                                                <Input
                                                    label="Date"
                                                    type="date"
                                                    name="date"
                                                    className="text-lg"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className='md:col-span-2'>
                                                <Input
                                                    label="Time"
                                                    type="time"
                                                    name="time"
                                                    className="text-lg"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {errors.submit && <p className="text-red-500">{errors.submit}</p>}
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                            disabled={loading}
                                        >
                                            {loading ? 'Submitting...' : 'Submit Request'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-center text-red-600 font-semibold text-xl mb-4">
                                        Please log in to submit a service request.
                                    </p>
                                    <Link href="/page/auth/login">
                                    <button className="bg-blue-600 px-6 py-3 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300">
                                        Login
                                    </button>
                                    </Link>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Service />
            <Footer />
        </>
    );
}
