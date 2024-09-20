"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Loading from '../Loader/Loading';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export default function Service() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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



    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 1200, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };




    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="bg- p-6 text-white  shadow-lg">
            <div className="container mx-auto lg:w-[80%]">

                <h2 className="text-3xl text-black text-center font-bold mb-4 ">
                    Need Home Services?
                </h2>

                <Carousel responsive={responsive} infinite={true} autoPlay removeArrowOnDeviceType={["tablet", "mobile"]}>

                    {services.map((item) => (
                        <div key={item.id} className=' px-2'>
                            <div key={item.id} className="relative  rounded-md overflow-hidden  lg:col-span-1 md:col-span-1   h-40 w-full">
                                <Image alt='' className=' w-full h-full z-0 object-cover' src={item.imageUrl} fill />
                                <div className=' absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-b from-transparent  to-black z-20'></div>
                                <div className=' px-2  absolute  bottom-0 left-0 right-0   z-30'>
                                    <p className=' text-sm line-clamp-2'>{item.description}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className=' z-20 text-xl'>{item.title}</p>

                                        <Link href={`/page/service/${item.title}`}>
                                            <button className='  m-4 bg-2 text-white rounded-md px-3 py-1 text-sm'>Book Now</button>
                                        </Link>
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </Carousel>
            </div>


        </div>

    );
}
