"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loader/Loading";
import Imagegallery from "@/components/gallery/Imagegallery";
import Carouselcard from "@/components/card/carouselcard/Carouselcard";
import Service from "@/components/service/Service";
import Details from "@/components/details/Details";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactUs from "@/components/card/contactus/ContactUs";
import { Carousel } from "@/components/Carousel";
import Enquiry from "@/components/Enquiry/Enquiry";
import { Building, SquareChartGantt } from "lucide-react";
import Whatsapp2 from "@/components/Whatsapp2/Whatsapp2";
import Link from "next/link";
import Image from "next/image";
import Guide from "@/components/guide/Guide";
import GraphChart from "@/components/graphchart/Graphchart";
import Review from "@/components/review/Review";
import AllReview from "@/components/AllReview/AllReview";
export default function SinglePage({ params }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = params.id;

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`/api/project/fetch-byslug/${id}`);
                setProject(response.data.project);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch project data");
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);




    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <>
            <Navbar />

            <title>{project.metatitle}</title>
            <meta name="description" content={project.metadescription} />

            <Carousel details={project.featureImage} propertyname={project.propertyname} />

            <div className="container lg:w-[90%] mx-auto">


                <div className="my-5 container p-6 bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl">
                    <div className="grid md:grid-cols-2 gap-4 items-start">
                        {/* Left Section */}
                        <div>
                            <h1 className="text-4xl font-extrabold text-zinc-900 mb-3 leading-tight">{project.propertyname}</h1>
                            <h2 className="text-lg text-gray-600 leading-relaxed">
                                {project.address.houseNumber}, {project.address.colony}, {project.address.area}, {project.address.city}
                            </h2>
                        </div>

                        {/* Right Section */}
                        <div className="md:flex md:justify-end">
                            {project.percentage ? (
                                <div className=" p-3 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-50 transition-shadow hover:shadow-md space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className=" ">🔑</span>
                                        <p className="text-lg font-extrabold text-zinc-900">Broker = </p>
                                        <p className="text-lg text-gray-600">{project.name}</p>
                                        <p className="text-sm  flex justify-center items-center w-8 h-8 font-bold text-white bg-2 rounded-full"> {project.percentage}%</p>
                                    </div>
                                </div>
                            ) : (
                              
                                 <div className=" p-3 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-50 transition-shadow hover:shadow-md space-y-3">
                                 <div className="flex items-center gap-2">
                                     <span className=" ">🏠</span>
                                     <p className="text-lg font-extrabold text-zinc-900">Owner = </p>
                                     <p className="text-lg text-gray-600">{project.name}</p>
                                 </div>
                             </div>
                            )}
                        </div>
                    </div>



                    <h3 className="text-3xl font-bold text-2 mt-3 mb-4">
                        ₹ {project.price.toLocaleString()}
                    </h3>

                    <p className="text-sm mb-2">
                        Status: <span className={`font-semibold ${project.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{project.status}</span>
                    </p>

                    <p className="text-sm mb-2 font-medium">
                        OnwerShip: <span className=" bg-2 text-white px-4 rounded-md p-1">{project.ownership}</span>
                    </p>

                    <div className=" flex flex-wrap gap-4">
                        <div className="flex items-center gap-x-4 mb-4 bg-gray-50 p-3 rounded-lg">
                            <div className="p-2 bg-teal-100 rounded-full">
                                <Building size={24} className="text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-700">Project Size</p>
                                <p className="text-sm text-zinc-500">{project.size} Sq. Ft</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-4 mb-4 bg-gray-50 p-3 rounded-lg">
                            <div className="p-2 bg-teal-100 rounded-full">
                                <SquareChartGantt size={24} className="text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-700">Configurations</p>
                                <p className="text-sm text-zinc-500">{project.bedrooms} BHK, {project.floor} Floor</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-wrap gap-4">
                        <Whatsapp2 />
                        <Link href="/page/contactus" >
                            <button className=' border gap-x-3 font-medium w-40 flex items-center justify-center px-3 py-2 rounded-md bg-2 text-white'>
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>


                <div className="grid lg:grid-cols-7 gap-4 mb-5 py-4">
                    <div className=" lg:col-span-5">


                        <div className=' bg-zinc-100 py-6'>
                            <div className=" border-b mb-4">
                                <div className=" flex flex-wrap  justify-evenly">
                                    <div className=" text-center p-2 ">
                                        <p className='font-semibold text-xs md:text-md lg:text-lg text-gray-700'>  {project.bedrooms ? `${project.bedrooms} BHK ` : ''}{project.type}</p>
                                        <p className=' text-gray-500 text-xs font-semibold'>Configurations</p>
                                    </div>

                                    <div className=" text-center p-2 ">
                                        <p className='font-semibold text-xs md:text-md lg:text-lg text-gray-700'><span>{new Date(project.dateListed).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>            </p>
                                        <p className=' text-gray-500 text-xs font-semibold'>Possession Starts</p>
                                    </div>

                                    <div className=" text-center p-2 ">
                                        <p className='font-semibold text-xs md:text-md lg:text-lg text-gray-700'>₹ {project.price}</p>
                                        <p className=' text-gray-500 text-xs font-semibold'>Avg. Price</p>
                                    </div>
                                    <div className=" text-center p-2 ">
                                        <p className='font-semibold text-xs md:text-md lg:text-lg text-gray-700'>{project.address.area}</p>
                                        <p className=' text-gray-500 text-xs font-semibold'>Area</p>
                                    </div>

                                </div>
                            </div>
                            <div className="container  mx-auto lg:w-[90%] w-[95%]">
                                <Details item={project} />
                                <GraphChart />
                                <Guide />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 ">
                        <div className=" sticky top-24 mb-5 lg:mb-0">
                            <div className=" mb-2">
                                <Enquiry item={project} />
                            </div>

                            <ContactUs />
                        </div>
                    </div>
                </div>
                <h2 className=" font-semibold text-2xl underline underline-offset-4 mt-4 mb-2 px-4">Other Images</h2>
                <div className=" overflow-scroll ">
                    <Imagegallery item={project.images} />
                </div>


                <div className="  grid lg:grid-cols-3">
                    <div className=" lg:col-span-1"> <Review projectid={project._id} /></div>
                    <div className="   lg:col-span-2 overflow-hidden"> <AllReview projectid={project._id} /></div>
                </div>



                <div className=" my-5 px-2">
                    <h3 className="text-xl font-semibold underline px-3">Related Posts</h3>
                    <Carouselcard listingType={project.listingType} />

                    <Service />
                </div>


            </div>
            <Footer />

        </>
    );
}
