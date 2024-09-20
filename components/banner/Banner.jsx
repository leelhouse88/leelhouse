"use client";
import { useState, useEffect } from 'react';
import Tabbanner from "@/components/tab/Tabbanner";
import Link from 'next/link';

export default function Banner({ location, setLocation, motive, setMotive, type, setType }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    handleClosePopup();
  }, [location, motive, type]);

  return (
    <div className='relative h-full bg-banner overflow-hidden'>
      <div className='relative container lg:w-5/6 mx-auto py-5 lg:py-8 overflow-hidden h-full'>
        {/* Button to open popup on small screens */}
        <div className='lg:hidden absolute bottom-0 right-0 left-0 z-40 text-center mb-5'>
          <button 
            onClick={handleOpenPopup}
            className=' bg-gradient-to-b from-transparent to-[#005ca8] border backdrop-blur-md text-white font-medium text-sm px-5 py-2 rounded-[30px]'
          >
            Discover Properties
          </button>
        </div>

        {/* Tab banner displayed as popup on small screens */}
        {isPopupOpen && (
          <div className='fixed px-4 inset-0 flex items-center justify-center z-50 bg-black/50'>
            <div className='bg-white p-5 rounded-lg w-full max-w-lg mx-auto relative'>
              <button 
                onClick={handleClosePopup} 
                className='absolute top-2 right-2 text-black text-xl'
              >
                &times;
              </button>
              
              <Tabbanner 
               location={location} setLocation={setLocation} motive={motive} setMotive={setMotive} type={type} setType={setType}
              />
            </div>
          </div>
        )}

        <div className='absolute bottom-0 left-0 right-0 p-5 mt-10'>
          <div className='xl:w-2/6 sm:mb-2'>
            <div className='hidden lg:block'>
              <Tabbanner 
                location={location} 
                setLocation={setLocation} 
                motive={motive} 
                setMotive={setMotive} 
                type={type} 
                setType={setType} 
              />
            </div>
          </div>
        </div>

        <div className='absolute hidden lg:block bottom-0 mb-2 left-0 right-0 text-center'>
          <p className='bg-black/50 backdrop-blur-md inline text-white font-medium text-sm px-5 py-2 rounded-[30px]'>
            Are you an Owner?
            <Link href="/page/auth/login">
              <span className='underline cursor-pointer ml-1 text-2'>Post property for free</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
