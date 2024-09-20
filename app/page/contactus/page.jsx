"use client"
import React, { useEffect, useState } from 'react'
import Input from '@/app/admin/components/Input/Input';
import { PhoneCall, Mail, MapPin } from "lucide-react"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobilenumber: '',
        message: ''
    });


    const [isFormValid, setIsFormValid] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };


        setFormData(updatedFormData);


        setIsFormValid(
            updatedFormData.name.trim() &&
            updatedFormData.email.trim() &&
            updatedFormData.mobilenumber.trim() &&
            updatedFormData.message.trim()
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('/api/contactus/create', formData);
            if (response.status === 200) {
                toast.success("Request Sent Successfullt")
            }
            console.log('Form submitted successfully:', response.data);

            setFormData({ name: '', email: '', mobilenumber: '', message: '' });
            setIsFormValid(false);
        } catch (error) {

            console.error('Error submitting form:', error);
        }
    };

    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await axios.get('/api/metadata/fetchall/metadata');
                setMetadata(response.data.fetch);
            } catch (err) {
                console.error('Failed to fetch metadata:', err);
            }
        };

        fetchMetadata();
    }, []);

    const filteredMetadata = metadata.filter(item => item.page === 'Contactus');

    return (
        <div className="flex bg-banner flex-col lg:flex-row  h-screen bg-gray-50">
            {filteredMetadata.map((item) => (
        <>
          <title key={item._id}>{item.title}</title>
          <meta name="description" content={item.description} />
        </>
      ))}
            <ToastContainer />
            <div className='absolute top-0 right-0 left-0 bottom-0 bg-black/40'></div>
            <div className="flex-1 h-96 my-auto z-50 bg-[#ffffff9e] rounded-r-[50px] p-10 flex flex-col justify-center items-start space-y-5">
                <h1 className="text-3xl font-extrabold text-[#005ca8] mb-0">
                    Get in Touch with Our Sales Team
                </h1>
                <p className="text-gray-600 text-md">
                    Connect with us through email, phone, or visit our branch office at the address below:
                </p>
                <div className="space-y-3 w-full">
                    <div className="flex items-center bg-white border-l-4 border-[#ffaa3e] p-4 rounded-md shadow-sm">
                        <PhoneCall size={18} className="text-[#ffaa3e] mr-3" />
                        <a href="tel:6378822375" className="text-sm text-[#005ca8] hover:underline">
                            +91-6378822375
                        </a>
                    </div>
                    <div className="flex items-center bg-white border-l-4 border-[#ffaa3e] p-4 rounded-md shadow-sm">
                        <Mail size={18} className="text-[#ffaa3e] mr-3" />
                        <a href="mailto:info@neoitsolution.com" className="text-sm text-[#005ca8] hover:underline">
                            info@leelhouse.com
                        </a>
                    </div>
                    <div className="flex items-center bg-white border-l-4 border-[#ffaa3e] p-4 rounded-md shadow-sm">
                        <MapPin size={18} className="text-[#ffaa3e] mr-3" />
                        <span className="text-sm text-gray-700">
                            Plot No. 7, Gandhi Path W, Kusum Vihar, Lalarpura, Jaipur, Rajasthan 302034, India
                        </span>
                    </div>
                </div>
            </div>


            <div className="flex-1 flex justify-center items-center lg:py-0 py-10 relative">
                <div className="bg-white border shadow-xl rounded-md w-full max-w-lg p-8">
                    <h1 className='text-xl font-semibold mb-5'>Contact Us</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="number"
                            name="mobilenumber"
                            placeholder="Mobile Number"
                            value={formData.mobilenumber}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="message"
                            placeholder="Description"
                            rows={7}
                            className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className={`w-full py-3 text-white font-semibold rounded-sm focus:outline-none focus:ring-1 focus:ring-offset-2 transition
                                ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!isFormValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
