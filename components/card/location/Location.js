import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';

export default function Location({location}) {
    const [locationData, setLocationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/project/fetchall/project');
                const properties = response.data.fetch;

                // Group the properties by location and count how many properties each location has
                const locationCount = properties.reduce((acc, property) => {
                    const loc = property.location.toUpperCase(); // Ensure case-insensitivity
                    if (!acc[loc]) {
                        acc[loc] = 0;
                    }
                    acc[loc]++;
                    return acc;
                }, {});

                // Convert the object to an array of { location, count }
                const locationArray = Object.keys(locationCount).map(loc => ({
                    location: loc,
                    count: locationCount[loc]
                }));

                setLocationData(locationArray);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching project data:", error);
                setLoading(false);
            }
        };

        fetchData();
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
                    <Loading />
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
                    {locationData.map((item, index) => (
                        <div key={index} className="p-4">
                            <Link href={`/categories/all category-${item.location.toLowerCase()}`}>
                                <div className="group transform transition-transform duration-300  rounded-lg bg-gradient-to-r from-blue-400 to-[#005ca8] ">
                                    <div className="p-6">
                                        <h2 className="text-3xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">{item.location}</h2>
                                        <p className="text-xl text-gray-200 mb-4">{item.count} properties</p>
                                        <div className="text-white group-hover:text-yellow-400 transition-colors duration-300">
                                            <span className="font-medium">Explore Now &rarr;</span>
                                        </div>
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
