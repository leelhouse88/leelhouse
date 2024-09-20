"use client";
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { User, Bell, Search, LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };



    return (
        <>
            <header className="bg-2  text-white px-2 md:px-4 py-2 flex justify-between items-center">
                <div className=' flex items-center'>
                    <Link href="/">
                        <Image
                            alt='Logo'
                            src="/logo/man-logo.svg"
                            width={205}
                            height={38.625}
                        />
                    </Link>
                </div>
                {/* <form className="hidden md:flex items-center bg-[#ffffff38] rounded-md overflow-hidden">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search..."
                            className="bg-transparent placeholder:text-white text-white px-4 py-2 w-72 text-sm focus:outline-none"
                        />
                        <button type="submit" className="flex items-center justify-center px-2">
                            <Search color="#fff" size={20} />
                        </button>
                    </form> */}
                <div className="flex items-center relative">
                    {session?.user && (
                        <>
                            <div className="flex items-center bg-[#ffffff38] px-4 py-2 rounded-md cursor-pointer" onClick={toggleDropdown}>
                                <User color="#fff" size={20} />
                                <span className="text-sm ms-1">{session.user.name}</span>
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-sm shadow-lg">
                                    <ul className="p-2 space-y-2">
                                        <li>
                                            <Link
                                                className="inline-flex items-center gap-2 rounded-md px-4 w-full py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                                                href="/user/page/profile"
                                                onClick={closeDropdown}
                                            >
                                                <UserCircle size={20} className="text-gray-500" />
                                                <span>Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="inline-flex items-center gap-2 w-full px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors duration-200"
                                                onClick={() => {
                                                    signOut();
                                                    closeDropdown();
                                                }}
                                            >
                                                <LogOut size={20} />
                                                <span>Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}


                </div>
            </header>
        </>
    );
}
