"use client"
import React, { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ item }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClick = (image) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className=" flex flex-wrap gap-4 px-5">
                {item.map((image, index) => (
                    <div
                        key={index}
                        className="relative h-36 w-36 md:col-span-1 sm:col-span-1 col-span-1 cursor-pointer "
                        onClick={() => handleClick(image)}
                    >
                        <Image
                            alt=''
                            src={image}
                            width={300}
                            height={300}
                            className="rounded-md object-cover h-full w-full"
                            // layout="responsive"
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-cente z-50 p-4">
                    <div className="relative lg:h-[300px] md:h-[400px] h-[300px] w-[300px]   lg:w-[600px] md:w-[400px]  ">
                        <Image
                            alt=''
                            src={selectedImage}
                            width={400}
                            height={400}
                            className="rounded-lg object-cover"
                            layout="responsive"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex justify-center items-center hover:bg-opacity-75 transition-opacity duration-200"
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
