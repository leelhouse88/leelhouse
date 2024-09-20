import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './button/Btn2';
import Whatsapp from './whatsapp/Whatsapp';
export default function Footer() {
    const links = [
        { id: 1, title: "Home", path: "/" },
        { id: 2, title: "Saved", path: "/user/page/wishlist", icon: <Heart color="white" size={14} /> },
        { id: 3, title: "Service", path: "/page/ourservice" },
        { id: 4, title: "About Us", path: "/page/aboutus" },
        { id: 5, title: "Post Property", path: "/page/postproperty" },
    ];

    return (
        <>

            <div className='bg-[#141414] text-white'>
                <div className="container lg:w-5/6 mx-auto py-4 md:py-10 px-4">
                    <div className="grid lg:grid-cols-8 md:grid-cols-4 gap-5 mb-6">
                        <div className="lg:col-span-2 md:col-span-2 ">
                            <div className=' mb-3 h-12 '>
                                <Image alt='' src="/logo/Group 349 (1).svg" width={200} height={38.625} />
                            </div>
                            <p className='mb-6 text-sm leading-6'>The site provides advanced search filters and personalized recommendations to match buyers with their ideal homes.</p>
                            <ul className='flex gap-4'>
                                <li><Link href=""><Facebook color='#7F7F7F' width={20} /></Link></li>
                                <li><Link href=""><Instagram color='#7F7F7F' width={20} /></Link></li>
                                <li><Link href=""><Twitter color='#7F7F7F' width={20} /></Link></li>
                                <li><Link href=""><Linkedin color='#7F7F7F' width={20} /></Link></li>
                                <li><Link href=""><Youtube color='#7F7F7F' width={20} /></Link></li>
                            </ul>
                        </div>
                        <div className="lg:col-span-2 md:col-span-2 ">
                            <h4 className='text-lg md:mb-4 font-semibold md:h-12 mb-2'>Contact Info</h4>
                            <p className='text-sm mb-2 leading-6'>Unicoder Design Agency 301 The Greenhouse, Custard Factory, London, E3 8DY.</p>
                            <p className='text-sm mb-2'>+91-9828988333</p>
                            <p className='text-sm mb-2'>leelproperty21@gmail.com</p>
                        </div>
                        <div className="lg:col-span-2 md:col-span-2 ">
                            <h4 className='text-lg md:mb-4 font-semibold md:h-12 mb-2'>Quick Links</h4>
                            <ul className='text-sm'>
                                {links.map((item) => (
                                    <Link key={item.id} href={item.path}>
                                        <li className="mb-2 hover:text-[#AA8453] cursor-pointer flex items-center gap-x-1">
                                            {item.title}
                                            {item.icon}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:col-span-2 md:col-span-2 ">
                            <h4 className='text-lg md:mb-4 font-semibold md:h-12 mb-2'>Appointment</h4>
                            <p className='text-sm mb-4'>Book your appointment now</p>
                            <Link href="/page/contactus">
                                <Button title="Register Now" />
                            </Link>
                        </div>
                    </div>
                    <div className='text-center py-2 border-t border-gray-700 text-xs'>
                        © 2022 GharDhundo.com. All rights reserved.
                    </div>
                </div>

            </div>


            <div className='fixed bottom-0 right-0 z-40 m-5'>
            <Whatsapp width={40} height={40}/>
            </div>

         
        </>
    );
}
