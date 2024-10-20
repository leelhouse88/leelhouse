"use client";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Input from '../../components/Input/Input';
import Select from '../../components/Input/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Addnew() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        metatitle: '',
        metadescription: '',
        type: '',
        propertyname: '',
        sellertype: '',  // Add sellertype here
        name: '',  // For Owner
        percentage: '',  // For Broker
        ownership: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();

    const useremail = session?.user?.email;

    useEffect(() => {
        if (useremail) {
            axios.get(`/api/admin/find-admin-byemail/${useremail}`)
                .then(response => {
                    setUserData(response.data._id);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                });
        }
    }, [useremail]);

    const validateForm = useCallback(() => {
        const { title, location, price, metatitle, metadescription, type, propertyname, sellertype, name, percentage, ownership } = formData;

        // Ensure the appropriate field for 'Onwer' or 'Broker' is filled
        const isSellerFieldValid = sellertype === 'Onwer' ? name : sellertype === 'Broker' ? percentage : true;

        return title && location && price && metatitle && metadescription && type && propertyname && sellertype && isSellerFieldValid && ownership;
    }, [formData]);

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData, validateForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        if (!userData) {
            setMessage("Admin ID not available. Please try again later.");
            setIsSubmitting(false);
            return;
        }

        const finalFormData = { ...formData, adminid: userData };

        try {
            const response = await axios.post('/api/project/create', finalFormData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                toast.success("Property Added Successfully");
                const newProjectId = response.data.data.id;
                router.push(`addnew/update/${newProjectId}`);
                setFormData({
                    title: '',
                    location: '',
                    price: '',
                    type: '',
                    metatitle: '',
                    metadescription: '',
                    propertyname: '',
                    sellertype: '',
                    name: '',
                    percentage: '',
                    ownership: ''
                });
            } else {
                setMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error adding property:', error);
            setMessage('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer />

            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-6">Add New Property</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-4">
                        {/* Other form inputs */}

                        <div className=''>
                            <label htmlFor="sellertype" className="block text-sm font-medium text-gray-700">Seller Type</label>
                            <select
                                id="sellertype"
                                name="sellertype"
                                value={formData.sellertype}
                                onChange={handleChange}
                                className="w-full h-8 py-1 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                required
                            >
                                <option value="" disabled>Select Seller Type</option>
                                <option value="Onwer">Owner</option>
                                <option value="Broker">Broker</option>
                            </select>
                        </div>

                        {/* Conditional input based on seller type */}
                        {formData.sellertype === 'Onwer' && (
                            <div className=''>
                                <Input
                                    name="name"
                                    label="Owner Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                />
                            </div>
                        )}

                        {formData.sellertype === 'Broker' && (
                            <>
                                <div className=''>
                                    <Input
                                        name="name"
                                        label="Broker Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                    />
                                </div>
                                <div className=''>
                                    <Input
                                        name="percentage"
                                        label="Broker Percentage"
                                        value={formData.percentage}
                                        onChange={handleChange}
                                        type="number"
                                        step="0.01"
                                    />
                                </div>
                            </>
                        )}

                        <div className=''>
                            <label htmlFor="ownership" className="block text-sm font-medium text-gray-600">Ownershp</label>
                            <select name="ownership"
                                label="ownership"
                                value={formData.ownership}
                                onChange={handleChange}
                                className="w-full h-8 py-2 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                required
                            >
                                <option value="">SELECT OWNERSHIP</option>
                                <option value="Freehold">Freehold</option>
                                <option value="Leasehold">Leasehold</option>
                                <option value="Co-operative society">Co-operative society</option>
                                <option value="Power of Attorney">Power of Attorney</option>

                            </select>

                        </div>
                        <div className=''>
                            <Select
                                name="title"
                                label="Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className=''>
                            <Input
                                name="propertyname"
                                label="Property Name"
                                value={formData.propertyname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className=''>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-600">City</label>
                            <select name="location"
                                label="Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full h-8 py-2 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                required
                            >
                                <option value="">SELECT DISTRICT</option>
                                <option value="AJMER">AJMER</option>
                                <option value="ALWAR">ALWAR</option>
                                <option value="BANSWARA">BANSWARA</option>
                                <option value="BARAN">BARAN</option>
                                <option value="BARMER">BARMER</option>
                                <option value="BHARATPUR">BHARATPUR</option>
                                <option value="BHILWARA">BHILWARA</option>
                                <option value="BIKANER">BIKANER</option>
                                <option value="BUNDI">BUNDI</option>
                                <option value="CHITTORGARH">CHITTORGARH</option>
                                <option value="CHURU">CHURU</option>
                                <option value="DAUSA">DAUSA</option>
                                <option value="DHOLPUR">DHOLPUR</option>
                                <option value="DUNGARPUR">DUNGARPUR</option>
                                <option value="HANUMANGARH">HANUMANGARH</option>
                                <option value="JAIPUR" >JAIPUR</option>
                                <option value="JAISALMER">JAISALMER</option>
                                <option value="JALORE">JALORE</option>
                                <option value="JHALAWAR">JHALAWAR</option>
                                <option value="JHUNJHUNU">JHUNJHUNU</option>
                                <option value="JODHPUR">JODHPUR</option>
                                <option value="KARAULI">KARAULI</option>
                                <option value="KOTA">KOTA</option>
                                <option value="NAGAUR">NAGAUR</option>
                                <option value="PALI">PALI</option>
                                <option value="PRATAPGARH">PRATAPGARH</option>
                                <option value="RAJSAMAND">RAJSAMAND</option>
                                <option value="SAWAI MADHOPUR">SAWAI MADHOPUR</option>
                                <option value="SIKAR">SIKAR</option>
                                <option value="SIROHI">SIROHI</option>
                                <option value="SRI GANGANAGAR">SRI GANGANAGAR</option>
                                <option value="TONK">TONK</option>
                                <option value="UDAIPUR">UDAIPUR</option>
                            </select>

                        </div>
                        <div className=''>
                            <Input
                                name="price"
                                label="Price"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                            />
                        </div>

                        <div className=''>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full h-8 px-3 py-2 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                required
                            >
                                <option value=""></option>

                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Land">Land</option>
                                <option value="Office">Office</option>
                            </select>
                        </div>
                        <div className=''>
                            <Input
                                name="metatitle"
                                label="SEO Title"
                                value={formData.metatitle}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className=''>
                            <Input
                                name="metadescription"
                                label="SEO Description"
                                value={formData.metadescription}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`w-full   ${isFormValid ? 'bg-indigo-600' : ' bg-indigo-200'} text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            disabled={isSubmitting || !isFormValid}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Property'}
                        </button>
                    </div>

                    {message && <p className="text-red-500 mt-4">{message}</p>}
                </form>
            </div>
        </>
    );
}
