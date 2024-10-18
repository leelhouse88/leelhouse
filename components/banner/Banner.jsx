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
        <div  onClick={handleOpenPopup} className='lg:hidden cursor-pointer  text-center  mb-1 mx-2 p-2 absolute bottom-0 right-0 left-0 z-40'>

        <button
            className='flex items-center border border-gray-950 gap-5 w-full bg-white  font-medium text-lg px-6 py-2 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out'
          >
            <span className='text-xl animate-pulse'>🔍</span>
            <span className=' font-normal underline underline-offset-4 text-[15px] text-gray-600'>Search Properties . . .</span>
          </button>

        </div>

        {/* Tab banner displayed as popup on small screens */}
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className=" p-6 sm:p-8 md:p-10 rounded-lg w-full  mx-auto shadow-lg">
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-3 z-50 bg-2 w-8 h-8 text-white rounded-full text-2xl focus:outline-none"
            >
              &times;
            </button>
        
            {/* Modal content */}
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
