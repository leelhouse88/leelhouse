"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BedDouble, Bath, PencilRuler, MapPinned, Home, Heart } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loader/Loading';

export default function Card({ listingType, purpose, location, type }) {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [totalProperties, setTotalProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const useremail = session?.user?.email;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 3
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

  // Fetch user data based on email
  useEffect(() => {
    if (useremail) {
      axios.get(`/api/admin/find-admin-byemail/${useremail}`)
        .then(response => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [useremail]);

  // Fetch properties and apply filters
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/project/fetchall/project');
        const properties = response.data.fetch;

        const filteredProperties = properties.filter(property =>
          (!listingType || property.listingType === listingType) &&
          (!location || property.location === location)&&
          (!purpose || property.purpose === purpose)&&
          (!type || property.title === type)
        );

        setTotalProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [listingType, location, purpose, type]); // Dependencies for filtering properties

  const router = useRouter();

  // Handle adding property to wishlist
  const handleAddToWishlist = async (productId) => {
    if (!userData?._id) {
      router.push("/page/auth/login");
      return;
    }

    try {
      const response = await axios.post('/api/Wishlist/create', {
        userid: userData._id,
        productid: productId,
        defaultdata: "wishlist"
      });

      if (response.status === 200) {
        toast.success("Property successfully added to your wishlist! 🏡");
      }
    } catch (error) {
      toast("Property Already in your wishlist! 🏡");
    }
  };

  // Show loading component while data is being fetched
  if (loading) {
    return <Loading />;
  }

  return (
    <>
     <Toaster color="red" />
    
      <Carousel responsive={responsive} infinite={true} autoPlay removeArrowOnDeviceType={["tablet", "mobile"]}>
        {totalProperties.length > 0 ? (
          totalProperties.map((item) => (
            <Link key={item._id} href={`/properties/${item.slug}`}>
              <div className="group rounded-md bg-white overflow-hidden my-1 lg:mb-4 mx-3 backdrop-blur-md border duration-150 ">
                <div className="overflow-hidden relative">
                  {item.featureImage.length > 0 && (
                    <Image
                      className='object-cover h-60 w-full transition duration-300 ease-in-out transform group-hover:scale-105'
                      key={item.featureImage[0].id}
                      src={item.featureImage[0]}
                      alt=''
                      width={400}
                      height={300}
                    />
                  )}
                  <div className="absolute bg-gradient-to-t from-black top-0 bottom-0 left-0 right-0 flex justify-center items-center duration-300">
                  </div>
                  <button className='absolute top-0 left-0 m-3 bg-black/70 text-1 rounded-full px-3 py-1 font-bold text-[10px]'>For {item.purpose}</button>
                  <button className='absolute bottom-0 left-0 m-3 h-6 text-sm px-2 text-white flex items-center gap-x-2 '>
                    <Home color='#0078db' width={20} />{item.type}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(item._id);
                    }}
                    className='absolute bottom-0 right-0 m-3 h-6 text-sm px-2 text-white flex items-center gap-x-2 hover:scale-125 duration-300'
                    >
                    <Heart color='#ff0000' width={20} />
                  </button>
                </div>
                <div className="flex h-60 flex-col justify-between">
                  <div className="flex flex-col h-full justify-between">
                    <div className='p-4'>
                  
                      <h3 className='text-xl font-bold text-'>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price).replace('₹', '')} ₹</h3>
                      <p className='font-semibold text-lg'>{item.propertyname}</p>
                      <div className='flex items-center gap-x-2 mt-2 mb-1'>
                        <MapPinned width={18} color='#0078db' />
                        <span className='text-sm font-medium'>{item.address.houseNumber}, {item.address.colony}, {item.address.area}, {item.address.city}</span>
                      </div>
                      <div className="flex gap-x-4 mt-3">
                        <div className='flex items-center gap-x-1'>
                          <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                            <BedDouble width={12} color='#fff' />
                          </div>
                          <span className='text-[12px] ms-1'>{item.bedrooms}</span>
                        </div>
                        <div className='flex items-center gap-x-1'>
                          <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                            <Bath width={12} color='#fff' />
                          </div>
                          <span className='text-[12px] ms-1'>{item.bathrooms}</span>
                        </div>
                        <div className='flex items-center gap-x-1'>
                          <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                            <PencilRuler width={12} color='#fff' />
                          </div>
                          <span className='text-[12px] ms-1'>{item.size} SQFT</span>
                        </div>
                      </div>
                    </div>
                    <div className='border-t flex justify-between items-center p-4'>
                      <Image alt='' src="/logo/Group 349 (2).svg" width={150} height={38.625} />
                      <span className='text-sm text-gray-500'>{new Date(item.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-lg font-semibold">No Properties Found</div>
          </div>
        )}
      </Carousel>
    </>
  )
}
