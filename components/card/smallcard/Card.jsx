"use client"
import React from 'react'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Card() {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 1200, min: 1024 },
            items: 2
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
       <>
       <div className=' absolute left-0 right-0 top-0'>

       
        <Carousel responsive={responsive}>
            {[...Array(3)].map((_, index) => (


                <div key={index} className=' flex justify-between items-end bg-white rounded-md border p-2 mx-2'>
                    <div>
                        <p className=' text-sm font-semibold text-2'>School</p>
                        <p> The santa kidz school</p>
                    </div>
                    <div>
                        <p className=' text-sm font-semibold'>1 Min</p>
                        <p className=' text-xs'>(0.5 Km)</p>
                    </div>
                </div>

            ))}
        </Carousel>
        </div>
       </>
    )
}
