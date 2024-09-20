"use client"
import React, { useState } from 'react';
import Image from 'next/image'
import { StarIcon, Check, ArrowDown, ArrowUp, Calendar, Home, MapPin, Tag, Info, Phone ,ArrowRight } from 'lucide-react';
import Link from 'next/link';
export default function Card({ projdata }) {
   
   
    return (
        <div className='bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-4'>
    <div className='relative'>
        {projdata.images.length > 0 && (
            <Image
                src={projdata.images[0]}
                className="object-cover w-full h-64"
                width={800}
                height={400}
                alt="Project Image"
            />
        )}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/40'></div>
    </div>
    
    <div className='p-4'>
        <div className='flex items-center justify-between mb-3'>
            <h4 className='text-2xl font-bold text-gray-900'>{projdata.price} ₹</h4>
            <Link href={`singlepage/${projdata._id}`} className='bg-blue-500 text-white py-1 px-4 rounded-lg text-sm font-medium shadow hover:bg-blue-600 focus:outline-none'>
              <ArrowRight width={20}/>
            </Link>
        </div>
        
        <div className='flex flex-wrap gap-2 mt-2'>
            <span className='font-semibold text-indigo-600'>{projdata.type}</span>
            <div className='h-6 px-2 bg-indigo-500 text-white text-xs font-semibold rounded-md flex items-center'>
                {projdata.energyRating}
            </div>
            <div className='h-6 px-2 bg-gray-200 text-gray-800 text-xs font-semibold rounded-md flex items-center'>
                RERA <Check width={12} color='green' />
            </div>
        </div>
        
        <p className='text-sm text-gray-700 font-medium mb-2'>
            By Real Estate
        </p>
        <p className='text-sm text-gray-600 mb-4'>
            <span className='font-semibold text-gray-800'>{projdata.bedrooms} BHK Flat</span> for sale in {projdata?.address?.city}
        </p>
        
        <div className='text-gray-800 text-sm'>
            {projdata.description}
        </div>
    </div>
</div>

    
    );
}
