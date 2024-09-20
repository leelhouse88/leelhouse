"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';
import Link from 'next/link';
import { Menu, User,Ticket, XCircleIcon, Home, FileText, PlusCircle, ServerIcon, Mail, GitPullRequest, Contact, Database, Heart, Info } from 'lucide-react';

export default function Dashboard() {
    const { data: session } = useSession();
    const [totalProperties, setTotalProperties] = useState(null);
    const [latestUpdate, setLatestUpdate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/api/project/number/project');
                setTotalProperties(response.data.fetch);
                // Simulating fetching latest update
                setLatestUpdate("New property listings added recently.");
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

 
    const menuItems = [
        { name: 'All Users', href: '/admin/page/user', icon: <User size={20} color="#1E90FF" /> },
        { name: 'Our Services', href: '/admin/page/oursevice', icon: <ServerIcon size={20} color="#32CD32" /> },
        { name: 'Manage Properties', href: '/admin/page/property', icon: <FileText size={20} color="#FFD700" /> }, 
        { name: 'Wishlist', href: '/admin/page/wishlist', icon: <Heart size={20} color="#FF4500" /> },
        { name: 'Add Property', href: '/admin/page/addnew', icon: <PlusCircle size={20} color="#00BFFF" /> }, 
        { name: 'Service Request', href: '/admin/page/service', icon: <ServerIcon size={20} color="#ADFF2F" /> },
        { name: 'Enquiry', href: '/admin/page/enquiry', icon: <Info size={20} color="#FFA500" /> },
        { name: 'Property Post Request', href: '/admin/page/request', icon: <GitPullRequest size={20} color="#FF6347" /> },
        { name: 'Contact Request', href: '/admin/page/contact', icon: <Contact size={20} color="#8A2BE2" /> }, 
        { name: 'Website Metadata', href: '/admin/page/metadata', icon: <Database size={20} color="#4B0082" /> },
        { name: 'Offer', href: '/admin/page/offer', icon: <Ticket size={20} color="red" /> },
    ];
    

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
            <h2 className="text-3xl font-extrabold mb-10 bg-white p-6 rounded-lg shadow-xl text-center text-indigo-700">
                Welcome, <span className="text-indigo-600">{session?.user?.name}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Link href="/admin/page/property">
                            <div className="flex items-center p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500 transition-transform hover:scale-105">
                                <div className="w-12 h-12 bg-indigo-100 flex items-center justify-center rounded-full">
                                    <Home className="text-indigo-600 w-8 h-8" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Total Properties</h3>
                                    {/* <p className="mt-2 text-2xl font-bold text-gray-900">{totalProperties}</p> */}
                                </div>
                            </div>
                        </Link>

                        {menuItems.map((item, index) => (
                            <Link key={index} href={item.href}>
                                <div className="flex items-center p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500 transition-transform hover:scale-105">
                                    <div className="w-12 h-12 bg-indigo-100 flex items-center justify-center rounded-full">
                                        {item.icon}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
