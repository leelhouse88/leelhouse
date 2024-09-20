"use client";
import React, { useState } from 'react';
import { Menu, XCircleIcon, Home ,Heart,ServerIcon} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/user', icon: <Home size={20} /> },
    { name: 'My Wishlist', href: '/user/page/wishlist', icon: <Heart size={20} /> },
    { name: 'Service Request', href: '/user/page/service', icon: <ServerIcon size={20} /> },


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

        <ul className="space-y-1">
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
