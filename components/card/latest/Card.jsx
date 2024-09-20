import React from 'react'
import Image from 'next/image'
export default function Card() {
    return (
        <>

            <div className=" relative rounded-md overflow-hidden h-52">
                <Image alt='' className=' object-cover' src="/image/the_century_garden-bhankrota-jaipur-century.avif" fill />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black"></div>

                <div className=' p-4 absolute bottom-0 left-0 right-0 text-white'>
                    <h4 className=' font-semibold text-sm'>₹77.61 L - 1.02 Cr</h4>
                   <div className=' flex justify-between items-end'>
                    <div>
                    <p className=' text-xs'>Vinayak Royal Crysta</p>
                    <p className=' text-xs'>Mansarovar Extension, NH - 8 Ja</p>
                    </div>
                    <div>
                        <button className=' border rounded text-xs px-2'>View Details</button>
                    </div>
                   </div>
                </div>


            </div>
        </>
    )
}
