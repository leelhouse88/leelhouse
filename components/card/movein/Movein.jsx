import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';

export default function Movein({location}) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/category/fetchall/category')
            .then(response => {
                setOptions(response.data.fetch);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching options:", error);
                setLoading(false);
            });
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1200, min: 1024 },
            items: 3
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

    return (
        <div className="relative">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                 <Loading/>
                </div>
            ) : (
                <Carousel 
                    responsive={responsive} 
                    draggable={true} 
                    infinite={true} 
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    swipeable={true}
                    keyBoardControl={true}
                >
                    {options.map((item) => (
                        <div key={item._id} className="p-2">
                            <Link href={`/categories/${item.name.toLowerCase()}-${location.toLowerCase()}`}>
                                <div className="flex flex-col justify-between h-80 rounded-lg bg-[#f0f9ff]">
                                    <div className="p-4">
                                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">{item.name}</h2>
                                        <p className="text-lg text-gray-600 mb-4 line-clamp-2">{item.details}</p>
                                    </div>
                                    <div className="h-1/2">
                                        <Image 
                                            className="w-full h-full object-cover rounded-b-lg" 
                                            src={item.img} 
                                            alt={`${item.name} Image`} 
                                            width={250} 
                                            height={250} 
                                            priority 
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
}
