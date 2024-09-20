"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Service from '@/components/service/Service'
import axios from 'axios';
import Loading from '@/components/Loader/Loading'

import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/AddService/getdata/addservice');
            setServices(response.data.fetch);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

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


    const filteredMetadata = metadata.filter(item => item.page === 'AllService');

    return (
        <>
            <Navbar />
            {filteredMetadata.map((item) => (
                <>
                    <title key={item._id}>{item.title}</title>
                    <meta name="description" content={item.description} />
                </>
            ))}
            <div className='bg-banner relative py-20 flex justify-center items-center'>
                <div className=' absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black z-10'></div>
                <div className='container px-2 mx-auto lg:w-[90%] text-center z-20'>

                    <h1 className='text-white text-5xl font-bold mb-12'>Our Services</h1>
                    <p className=' hidden sm:block text-white text-justify'>At <span className=''>LEEL House</span> we go beyond just helping you find the perfect property.
                        We offer a comprehensive range of home services to ensure your new home is as comfortable and functional as
                        possible. From kitchen repairs to electrical work, plumbing, and general maintenance, our team of skilled
                        professionals is here to assist you every step of the way. Whether you are moving into a new home or upgrading your
                        current one, our services are designed to meet all your needs, ensuring a seamless and stress-free experience.
                        Trust us to not only help you find your dream property but also to keep it in top-notch condition.</p>


                </div>
            </div>

            <div className=''>
                <div className=' container mx-auto px-4 lg:w-[90%]'>

                    <div className="grid divide-y-2 divide-x-2 lg:grid-cols-3 md:grid-cols-2">

                        {isLoading ? (
                            <div className=' lg:col-span-3 md:col-span-2'>
                                <Loading />
                            </div>
                        ) : (
                            services.map((service, index) => (
                                <Link key={index} href={`/page/service/${service.title}`}>
                                    <div className=" p-6 h-full hover:bg-gray-50 transition duration-300 ease-in-out">
                                        <div className="h-full relative rounded-xl overflow-hidden  shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out">
                                            <div className="p-6 bg-white/80 h-full  z-50">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h2 className="text-2xl font-extrabold text-gray-800">{service.title}</h2>
                                                    <div className=" p-2 rounded-md shadow-md">
                                                        <Image alt="logo" width={120} height={120} src="/logo/Group 349 (2).svg" />
                                                    </div>
                                                </div>
                                                <hr className="border-t-2 border-gray-200 opacity-50 mb-4" />
                                                <p className="text-lg leading-relaxed line-clamp-4">{service.description}</p>
                                            </div>

                                            <Image className=' -z-10 rounded-md absolute top-0 left-0 right-0 bottom-0' alt='' fill src={service.imageUrl} />

                                        </div>
                                    </div>

                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Service />
            <Footer />
        </>
    )
}




