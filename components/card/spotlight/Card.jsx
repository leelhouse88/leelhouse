"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BedDouble, Bath, PencilRuler, MapPinned, Home } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';
export default function Card() {

    const responsive = {
        superLargeDesktop: {

            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };



    const [totalProperties, setTotalProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/api/project/fetchall/project');
                const properties = response.data.fetch;



                setTotalProperties(properties);


                setLatestUpdate("New property listings added recently.");
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);
    if (loading) {
        return (
            <Loading />
        );
    }


    return (
        <>


            <Carousel responsive={responsive} infinite={true} autoPlay removeArrowOnDeviceType={["tablet", "mobile"]}>
                {totalProperties.map((item) => (

                    <Link key={item.id} href={`/properties/${item.slug}`}>
                        <div className="rounded-2xl border group overflow-hidden mx-2 bg-white grid lg:grid-cols-7">

                            <div className="lg:col-span-2 order-2 lg:order-1 flex flex-col p-4 lg:p-6">
                                <div className='flex   bg-1 p-3 justify-center'>
                                    <Image alt='' src="/logo/Group 349 (2).svg" className='rounded-md' width={180} height={80} />

                                </div>

                                <div className='p-4'>
                                    <h3 className='text-2xl font-bold text-2 mb-2'>
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price).replace('₹', '')} ₹
                                    </h3>

                                    <p className='font-semibold text-lg mb-4'>{item.propertyname}</p>
                                    <div className='flex items-center gap-x-2 mb-4'>
                                        <MapPinned width={18} color='#aa8453' />
                                        <span className='text-[12px]  font-medium'>  {item.address.houseNumber}, {item.address.colony}, {item.address.area}, {item.address.city}</span>
                                    </div>
                                    <div className="flex gap-x-4 mb-4">
                                        <div className='flex items-center gap-x-1'>
                                            <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                                                <BedDouble width={12} color='#fff' />
                                            </div>
                                            <span className='text-[12px] ms-1'>{item.bedrooms}</span>
                                        </div>
                                        <div className='flex items-center gap-x-1'>
                                            <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                                                <Bath width={12} color='#fff' />
                                            </div>
                                            <span className='text-[12px] ms-1'>{item.bathrooms}</span>
                                        </div>
                                        <div className='flex items-center gap-x-1'>
                                            <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                                                <PencilRuler width={12} color='#fff' />
                                            </div>
                                            <span className='text-[12px] ms-1'>{item.size} SQFT</span>
                                        </div>
                                    </div>
                                    <Link href="/page/contactus">
                                        <button className='bg-2 text-white rounded-lg px-4 py-2 w-full font-medium'>
                                            Contact
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="lg:col-span-5 relative  lg:h-96 h-52 order-1 lg:order-2">
                                <Image alt='' className='object-cover absolute  duration-300 lg:h-96 h-52  w-full' src={item.featureImage[0]} fill />
                                {/* <Image alt='' className='object-cover absolute opacity-100 group-hover:opacity-0 duration-300 lg:h-96 h-52  w-full'  src={item.featureImage[1]} width={982} height={880} /> */}
                                <div className=' absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b filter grayscale  from-transparent via-transparent to-black/50'></div>
                            </div>
                        </div>

                    </Link>

                ))}
            </Carousel>

        </>
    )
}
