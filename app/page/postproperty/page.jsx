"use client"
import React,{useEffect,useState} from 'react'
import Postproperty from '@/components/postproperty/Postproperty'
import Image from 'next/image'
import { Circle } from "lucide-react"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'

export default function Page() {
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


const filteredMetadata = metadata.filter(item => item.page === 'Postproperty');


    return (
        <>
            <Navbar />
            {filteredMetadata.map((item) => (
        <>
          <title key={item._id}>{item.title}</title>
          <meta name="description" content={item.description} />
        </>
      ))}
            <div className='lg:h-screen bgblue bg-gradient-to-br from-white to-blue-800 pt-36 p-5'>

                <div className="container mx-auto lg:w-[90%] h-full flex  items-center justify-end py-5" >
                    <div className="grid  lg:grid-cols-5 w-full items-center">
                        <div className=" order-2 md:order-1 my-5 lg:my-0 lg:col-span-3 flex flex-col  justify-center lg:justify-start">
                            <h1 className="text-white font-semibold text-4xl">
                                Upload Your Property in <span className="text-orange-500">Simple</span> Steps
                            </h1>
                            <p className="text-white text-xl flex items-center gap-2 mt-4">
                                <Circle size={15} color="yellow" /> Fill in Basic Details
                            </p>
                            <p className="text-white text-xl flex items-center gap-2 mt-4">
                                <Circle size={15} color="yellow" /> Our Team Will Contact You for Verification
                            </p>
                            <p className="text-white text-xl flex items-center gap-2 mt-4">
                                <Circle size={15} color="yellow" /> We Will Keep You Updated
                            </p>
                            <p className="text-white text-xl flex items-center gap-2 mt-4">
                                <Circle size={15} color="yellow" /> Property Will Be Listed Once Approved
                            </p>


                        </div>
                        <div className="  order-1 md:order-2 lg:col-span-2">
                            <Postproperty />
                        </div>

                    </div>
                </div>


            </div>
            <Footer />

        </>
    )
}
