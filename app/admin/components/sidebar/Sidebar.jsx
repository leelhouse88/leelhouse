"use client";
import React, { useState } from 'react';
import { Menu, User,ListCheckIcon,Ticket,Info, XCircleIcon, Home, FileText, PlusCircle, ServerIcon, Mail, GitPullRequest, Contact ,Database,Heart} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: <Home size={20} /> },
    { name: 'All Users', href: '/admin/page/user', icon: <User size={20} /> },
    { name: 'Add Property', href: '/admin/page/addnew', icon: <PlusCircle size={20} /> },
    { name: 'Manage Properties', href: '/admin/page/property', icon: <FileText size={20} /> },
    { name: 'Category', href: '/admin/page/category', icon: <ListCheckIcon size={20} /> },
    { name: 'Our Services', href: '/admin/page/oursevice', icon: <ServerIcon size={20} /> },
    { name: 'Wishlist', href: '/admin/page/wishlist', icon: <Heart size={20} /> },
    { name: 'Website Metadata', href: '/admin/page/metadata', icon: <Database size={20} /> },
    { name: 'Service Request', href: '/admin/page/service', icon: <ServerIcon size={20} /> },
    { name: 'Property Post Request', href: '/admin/page/request', icon: <GitPullRequest size={20} /> },
    { name: 'Contact Request', href: '/admin/page/contact', icon: <Contact size={20} /> },
    { name: 'Enquiry', href: '/admin/page/enquiry', icon: <Info size={20} /> },
    { name: 'Offer', href: '/admin/page/offer', icon: <Ticket size={20} /> },
    { name: 'Reviews', href: '/admin/page/review', icon: <User size={20} /> },

  ];

  return (
    <>
      <div className={`bg-2 text-white w-full sm:w-96 p-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out md:w-64 fixed md:static inset-y-0 left-0 z-20`}>
        <div className='flex justify-end'>
          <button
            className="md:hidden text-white m-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <XCircleIcon size={24} color='#fff' />
          </button>
        </div>

        <ul className="space-y-1 overflow-y-scroll  h-[80vh]">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center text-sm px-4 py-2 rounded-md duration-150 ${pathname === item.href ? 'bg-[#ffffff38]' : 'hover:bg-[#ffffff38]'
                  } text-[#fff]`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="md:hidden bg-3 rounded-br text-white mr-4 absolute top-16"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} color='#0078db' />
      </button>
    </>
  );
}
