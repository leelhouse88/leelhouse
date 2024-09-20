"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Service from '@/components/service/Service';
import { Check, BookMarked, Phone } from "lucide-react"
export default function AboutUsPage() {
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


  const filteredMetadata = metadata.filter(item => item.page === 'Aboutus');
  return (
    <>
      <Navbar />
      {filteredMetadata.map((item) => (
        <>
          <title key={item._id}>{item.title}</title>
          <meta name="description" content={item.description} />
        </>
      ))}
      <div className=' relative bg-banner-about flex flex-col justify-center items-center'>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black z-10"></div>


        <div className='  z-20 flex flex-col justify-center items-center text-center'>
          <Image alt='' src="/logo/man-logo.svg" width={400} height={400} />
          <p className=' text-white'>Welcome to LEEL House, where finding your perfect property is a seamless and exciting journey.</p>
        </div>



        <div className="absolute  text-2xl font-semibold  bottom-0 rounded-tr-xl px-10 left-0 z-40 bg-2 text-white">
          About Us
        </div>

      </div>


      <div className="container mx-auto lg:w-[80%] my-10 p-6">

        <section className=" p-8 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-lg relative overflow-hidden">
          <h2 className='text-4xl font-bold text-gray-900 mb-4 relative z-10'>
            Our Story
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed relative z-10'>
            Founded with a passion for exceptional real estate experiences, LEEL House has grown from a small startup into a leading name in the property market. Our journey began with a vision to simplify the process of buying and selling homes, ensuring that each client receives personalized service and expert advice.
          </p>
        </section>

        <div className=' my-8'>
          <Service />
        </div>

        <div className="my-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Property Listing Process
          </h1>
          <p className="text-gray-600">
            Learn how we help you list your property for sale or rent with ease and professionalism.
          </p>
        </div>


        <div className="mt-12">
          <div className="flex flex-col lg:flex-row justify-between">


            <div className="flex-1 mb-6 lg:mb-0 lg:mr-6 bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className=" text-2 w-16 h-16 text-white flex items-center justify-center rounded-full shadow-md">
                  <Phone />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Step 1: Contact Us
              </h3>
              <p className="text-gray-500 text-center">
                Reach out to us to discuss your property details. We will guide you through the listing process and understand your needs.
              </p>
            </div>


            <div className="flex-1 mb-6 lg:mb-0 lg:mx-6 bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className=" text-2 w-16 h-16 text-white flex items-center justify-center rounded-full shadow-md">
                  <Check />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Step 2: Property Evaluation
              </h3>
              <p className="text-gray-500 text-center">
                We visit your property to evaluate its value and gather details to create an appealing listing.
              </p>
            </div>


            <div className="flex-1 mb-6 lg:mb-0 lg:ml-6 bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className=" text-2 w-16 h-16 text-white flex items-center justify-center rounded-full shadow-md">
                  <BookMarked />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Step 3: Listing & Marketing
              </h3>
              <p className="text-gray-500 text-center">
                We create a detailed listing and promote your property through various channels to attract potential buyers or renters.
              </p>
            </div>

          </div>
        </div>
      </div>



      <Footer />
    </>
  );
}
