"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';
import Head from 'next/head';

export default function SavedPage() {
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


  const filteredMetadata = metadata.filter(item => item.page === 'Wishlist');

  return (
    <>
      <Navbar />
      {filteredMetadata.map((item) => (
        <>
          <title key={item._id}>{item.title}</title>
          <meta name="description" content={item.description} />
        </>
      ))}

      <div className=' bg-2 h-16'></div>
      <div className=" h-96 flex justify-center items-center">
        <h1 className=' text-5xl font-semibold'>Saved Page</h1>
      </div>
      <div>

      </div>
      <Footer />
    </>
  );
}
