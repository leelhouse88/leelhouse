"use client"
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from '@/components/banner/Banner';
import Service from '@/components/service/Service';
import SpotlightCard from '@/components/card/spotlight/Card';
import CollectionCard from "@/components/card/collection/Card";

import Carouselcard from "@/components/card/carouselcard/Carouselcard";
import Movein from "@/components/card/movein/Movein"
import Button from "@/components/button/Btn";
import Link from 'next/link';
import Ping from '@/components/button/ping';
import axios from 'axios';
export default function MainPage() {
  const [location, setLocation] = useState('JAIPUR');
  const [motive, setMotive] = useState('Buy');
  const [type, setType] = useState('');

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


  const filteredMetadata = metadata.filter(item => item.page === 'Home');

  return (
    <>
      <Navbar location={location}/>
      
      {filteredMetadata.map((item) => (
        <>
          <title key={item._id}>{item.title}</title>
          <meta name="description" content={item.description} />
        </>
      ))}
      <Banner location={location} setLocation={setLocation} motive={motive} setMotive={setMotive} type={type} setType={setType} />

      <div className='  '>
        <div className='container lg:w-5/6 mx-auto py-5 lg:py-8'>
          <div className='lg:mb-4 mb-2 px-2 flex justify-between items-center'>
            <div>
              <h2 className='   text-2xl md:text-4xl'>In <span className='font-bold'> Spotlight</span> </h2>
              <div className=' bg-2 w-20 h-0.5 mt-2'></div>
            </div>

          </div>
          <SpotlightCard />
        </div>
      </div>

      <div className='bg-3 '>
        <div className='container lg:w-5/6 mx-auto py-5 lg:py-8'>
          <div className='lg:mb-4 mb-2 px-2 flex justify-between items-center'>
            <div>
              <div className=' relative'>
                <Ping location={location} />
                <h2 className='  text-2xl md:text-4xl'>Top <span className='font-bold'>Project</span></h2>

              </div>
              <div className=' bg-2 w-20 h-0.5 mt-2'></div>
            </div>
            <div className=''>
              <Link href={`/categories/all category-${location}`}>
                <Button title=" View All" />
              </Link>

            </div>
          </div>

          <Carouselcard listingType="Top Project" purpose={motive} location={location} type={type} />
        </div>
      </div>

      <div className='  '>
        <div className='container lg:w-5/6 mx-auto py-5 lg:py-8'>
          <div className='lg:mb-4 mb-2 px-2 flex justify-between items-center'>
            <div>
              <div className=' relative'>
                <Ping location={location} />
                <h2 className='text-2xl md:text-4xl'>Projects <span className='font-bold'>in Focus</span></h2>

              </div>
              <div className=' bg-2 w-20 h-0.5 mt-2'></div>
            </div>
            <div className=''>
            <Link href={`/categories/all category-${location}`}>
                <Button title=" View All" />
              </Link>
            </div>
          </div>
          <Carouselcard listingType="Focus" purpose={motive} location={location} type={type} />
        </div>
      </div>

      <div className=''>
        <div className='container lg:w-5/6 mx-auto py-5 lg:py-8'>
          <div className='lg:mb-4 mb-2 px-2 flex justify-between items-center'>
            <div>
              <div className=' relative'>
            
                <h2 className='text-2xl md:text-4xl'>Move in now</h2>

              </div>
              <div className=' bg-2 w-20 h-0.5 mt-2'></div>
            </div>

          </div>
          <Movein location={location} />
        </div>
      </div>


      <div className='bg-3 '>
        <div className='container lg:w-5/6 mx-auto py-5 lg:py-8'>
          <div className='lg:mb-4 mb-2 px-2 flex justify-between items-center'>
            <div>
              <div className=' relative'>
                <Ping location={location} />
                <h2 className=' text-2xl md:text-4xl'>Featured <span className='font-bold'>Project</span></h2>

              </div>
              <div className=' bg-2 w-20 h-0.5 mt-2'></div>
            </div>
            <div className=''>
            <Link href={`/categories/all category-${location}`}>
                <Button title=" View All" />
              </Link>
            </div>
          </div>
          <Carouselcard listingType="Featured" purpose={motive} location={location} type={type} />
        </div>
      </div>

      <div className=' '>
        <div className='container lg:w-5/6 mx-auto py-5 lg:py-8'>
          <div className='lg:mb-4 mb-2 px-2 flex justify-between items-center'>
            <div>
              <div className=' relative'>
                <Ping location={location} />
                <h2 className='text-2xl md:text-4xl'>Featured <span className='font-bold'>Collections</span></h2>

              </div>
              <div className=' bg-2 w-20 h-0.5 mt-2'></div>
            </div>

          </div>
          <CollectionCard location={location} />
        </div>
      </div>



      <Service />

      <Footer />
    </>
  );
}
