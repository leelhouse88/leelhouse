import React from 'react';
import Image from 'next/image';
import { StarIcon, Share2, ChartBar } from "lucide-react";
import Link from 'next/link';
import Whatsapp from '@/components/whatsapp/Whatsapp';
import toast, { Toaster } from 'react-hot-toast';
export default function ContactUs() {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Ghar Dhundo',
                text: 'Check out Ghar Dhundo for quality services since 2000.',
                url: window.location.href,
            })
            .then(() => toast.success('Thanks for sharing!'))
            .catch((error) => console.error('Error sharing:', error));
        } else {
            alert('Web Share API not supported in this browser.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-sm mx-auto">
             <Toaster />
            <div className="flex flex-col items-center gap-4">
                <Image 
                    alt="Ghar Dhundo Logo" 
                    width={150} 
                    height={80} 
                    src="/logo/Group 349 (2).svg" 
                    className="mb-2" 
                />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Your Dream, Direct</h2>
                    <p className="text-sm text-gray-500">Quality services since 2000</p>
                    <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} size={20} className="text-yellow-500" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-5 mb-3">
                <p className="text-gray-600 font-medium">Contact us today</p>
                <button 
                    onClick={handleShare} 
                    className="flex items-center gap-1 text-sm border border-blue-500 rounded-md px-3 py-1 hover:bg-blue-500 hover:text-white transition"
                >
                    Share <Share2 size={15} />
                </button>
            </div>
            <div className="flex items-center justify-between gap-2">
                <Link href="/page/contactus" className="w-full block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition duration-300">
                    Contact Us
                </Link> 
                <Whatsapp width={40} height={40} />
            </div>
            <p className="text-gray-500 flex items-center gap-2 mt-4 justify-between">
                <ChartBar size={20} className="text-gray-400" /> Responds in about 27 min
            </p>
        </div>
    );
}
