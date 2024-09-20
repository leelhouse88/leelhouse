"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Menu, XCircleIcon, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Ani from './button/ani';
import axios from 'axios';
export default function Navbar() {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ services: false, projects: false });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [options, setOptions] = useState([]);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const updateScreenSize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  const handleDropdownToggle = (name) => {
    if (isMobile) {
      setDropdownOpen((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };

  const handleMouseEnter = (name) => {
    if (!isMobile) {
      setDropdownOpen((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleMouseLeave = (name) => {
    if (!isMobile) {
      setDropdownOpen((prev) => ({ ...prev, [name]: false }));
    }
  };


  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/AddService/getdata/addservice');
      setServices(response.data.fetch);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {

    axios.get('/api/category/fetchall/category')
      .then(response => {
        setOptions(response.data.fetch);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching options:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <nav className={`z-50 py-2 left-0 right-0 ${scrolled ? 'bg-2 shadow-lg fixed top-0' : 'absolute bg-gradient-to-b from-black to-transparent'} transition-all duration-300`}>
        <div className="container w-[90%]  mx-auto">
          <div className="flex justify-between isolate p-1 md:p-2">
            <div className=' order order-3 lg:order-1 items-center flex'>
              <Link href="/">
                <Image alt='' src="/logo/man-logo.svg" width={201} height={38.625} />
              </Link>
            </div>

            <div className="relative order order-1 lg:order-2 w-full flex items-center lg:justify-end">
              <button className="block lg:hidden" onClick={handleToggle}>
                <Menu size={30} color="white" />
              </button>

              <ul
                className={`fixed lg:overflow-visible overflow-scroll top-0 right-0 w-full md:w-96 p-6 lg:p-0 h-full bg-[#222] transform ${show ? 'translate-x-0 backdrop-blur-md' : 'translate-x-full'} transition-transform duration-300 lg:relative lg:flex lg:w-auto lg:h-auto lg:bg-transparent lg:translate-x-0 lg:items-center lg:justify-end z-50`}
              >
                <button className="block lg:hidden " onClick={handleToggle}>
                  <XCircleIcon size={24} color="#fff" />
                </button>
                <Link href="/categories/all category-JAIPUR" className='flex items-center gap-x-1 mt-5 lg:mt-0 shadow-lg lg:shadow-none text-white px-5 lg:px-3 py-1 rounded-full transition duration-300 ease-in-out transform'>
                  <li className="text-sm text-gray-100 hover:text-white cursor-pointer rounded-md flex items-center gap-1 px-2 pb-1 lg:p-0">New Property</li>
                </Link>

                <div
                  className="relative mt-5 lg:mt-0"
                  onMouseEnter={() => handleMouseEnter('projects')}
                  onMouseLeave={() => handleMouseLeave('projects')}
                  onClick={() => handleDropdownToggle('projects')} d
                >
                  <Link href="/" className="flex items-center gap-x-1 shadow-lg lg:shadow-none text-white px-5 lg:px-3 py-1 rounded-full transition duration-300 ease-in-out transform">
                    <li className="text-sm group text-gray-100 hover:text-white cursor-pointer rounded-md flex items-center gap-1 px-2 pb-1 lg:p-0">
                      Our Projects <ChevronDown size={15} />
                    </li>
                  </Link>
                  {dropdownOpen.projects && (
                    <ul className=" lg:absolute lg:w-60 overflow-hidden z-50 top-5 mt-1 bg-white text-black left-0 right-0 rounded-lg shadow-lg">
                      {!isLoading && options.map(option => (
                        <Link key={option.id} href={`/categories/${option.name.toLowerCase()}`}><li className="px-4 py-2  text-sm font-medium text-gray-700 cursor-pointer hover:bg-[#005ca8] hover:text-white">{option.name}</li></Link>
                      ))}

                    </ul>
                  )}
                </div>

                <div
                  className="relative mt-5 lg:mt-0"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={() => handleMouseLeave('services')}
                  onClick={() => handleDropdownToggle('services')}
                >
                  <Link href="/page/ourservice" className="flex items-center gap-x-1 shadow-lg lg:shadow-none text-white px-5 lg:px-3 py-1 rounded-full transition duration-300 ease-in-out transform">
                    <li className="text-sm group text-gray-100 hover:text-white cursor-pointer rounded-md flex items-center gap-1 px-2 pb-1 lg:p-0">
                      Services <ChevronDown size={15} />
                    </li>
                  </Link>
                  {dropdownOpen.services && (

                    <ul className=" lg:absolute lg:w-60 overflow-hidden z-50 top-5 mt-1 bg-white text-black left-0 right-0 rounded-lg shadow-lg">
                      <Link href="/page/ourservice"><li className="px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-[#005ca8] hover:text-white">
                        All Services
                      </li></Link>
                      {isLoading ? (
                        <li className="px-4 py-2 text-sm font-medium text-gray-700">...</li>
                      ) : (
                        services.map((service, index) => (
                          <Link key={index} href={`/page/service/${service.title}`}><li className="px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-[#005ca8] hover:text-white">
                            {service.title}
                          </li></Link>
                        ))
                      )}

                    </ul>
                  )}
                </div>

                <Link href="/page/contactus" className='flex items-center gap-x-1 mt-5 lg:mt-0 shadow-lg lg:shadow-none text-white px-5 lg:px-3 py-1 rounded-full transition duration-300 ease-in-out transform'>
                  <li className="text-sm text-gray-100 hover:text-white cursor-pointer rounded-md flex items-center gap-1 px-2 pb-1 lg:p-0">Contact Us</li>
                </Link>

                <Link href="/page/postproperty" className='flex items-center gap-x-1 mt-5 lg:mt-0 shadow-lg lg:shadow-none text-white px-5 lg:px-3 rounded-full transition duration-300 ease-in-out transform'>
                  <li className="text-[12px] cursor-pointer rounded-2xl flex items-center gap-1 px-2 lg:m-0 pb-1 text-white lg:text-black lg:bg-white lg:px-5 lg:py-2">Post Property <Ani /></li>
                </Link>

                <Link href="/user/page/wishlist" className='flex items-center gap-x-1 mt-5 lg:mt-0 shadow-lg px-5 lg:px-2 lg:shadow-none text-white py-1 rounded-full transition duration-300 ease-in-out transform'>
                  <li className="cursor-pointer inline-block">
                    <Heart color="#FFF" size={22} />
                  </li>
                </Link>

                <Link href="/page/auth/login" className='flex items-center gap-x-1 mt-5 lg:mt-0 shadow-lg lg:shadow-none text-white px-5 lg:px-2 py-1 rounded-full transition duration-300 ease-in-out transform'>
                  <li className="cursor-pointer bg-white rounded-full p-2 inline-block shadow-md">
                    <User color="#4A4A4A" size={16} />
                  </li>
                  <span className="text-sm ms-1"> Login / Register</span>
                </Link>
              </ul>

              {show && (
                <div
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={handleToggle}
                />
              )}
            </div>

            <div className='order-2 '>
              <Link href="/page/auth/login" className='flex items-center gap-x-1 lg:hidden text-white pr-3 py-1 rounded-full transition duration-300 ease-in-out transform'>
                <li className="cursor-pointer bg-white rounded-full p-2 inline-block shadow-md">
                  <User color="#4A4A4A" size={16} />
                </li>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
