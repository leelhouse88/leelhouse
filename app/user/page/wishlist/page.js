"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loader/Loading';
import Image from 'next/image';
import { Home, Heart, MapPinned, BedDouble, Bath, PencilRuler } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Page() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const useremail = session?.user?.email;


  useEffect(() => {
    if (useremail) {
      axios.get(`/api/admin/find-admin-byemail/${useremail}`)
        .then(response => {
          setUserData(response.data._id);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [useremail]);

  // Fetch wishlist items for the user
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/api/Wishlist/find-byuserid/${userData}`);
        setWishlist(response.data);
      } catch (err) {
        setError('Data Not Available');
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchWishlist();
    }
  }, [userData]);

  // Fetch project details for each wishlist item
  useEffect(() => {
    const fetchProjectDetails = async (productid) => {
      try {
        const response = await axios.get(`/api/Wishlist/find-projectbyid/${productid}`);
        setProjects(prevProjects => ({
          ...prevProjects,
          [productid]: response.data
        }));
      } catch (err) {
        console.error('Error fetching project details:', err);
      }
    };

    wishlist.forEach(item => {
      if (!projects[item.productid]) {
        fetchProjectDetails(item.productid);
      }
    });
  }, [wishlist ,projects]);

  // Handle Delete
  const handleDelete = async (productid) => {
    try {
      await axios.delete(`/api/Wishlist/delete/${productid}`);
      setWishlist(prevWishlist => prevWishlist.filter(item => item.productid !== productid));
      toast.success("Removed from wishlist");
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Toaster />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="mb-2 md:mb-0">
            <p className="text-gray-600 text-xs md:text-sm">
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, wishlist.length)} of {wishlist.length}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 text-xs md:text-sm rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#0078db]/70 hover:bg-[#0078db] text-white'
                }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button className="bg-[#0078db] text-white rounded-md px-3 py-1 text-xs md:text-sm">
              {currentPage}
            </button>
            <button
              className={`px-3 py-1 text-xs md:text-sm rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#0078db]/70 hover:bg-[#0078db] text-white'
                }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2'>
     
        {currentItems.map((item) => (
          <div key={item.productid}>
            {projects[item.productid] ? (
              <div key={item.id} className="group rounded-md bg-white overflow-hidden my-1 lg:mb-4 mx-3 backdrop-blur-md border duration-150">
                <div className="overflow-hidden relative">
                  {projects[item.productid]?.featureImage?.length > 0 && (
                    <Image
                      className='object-cover h-60 w-full transition duration-300 ease-in-out transform group-hover:scale-105'
                      src={projects[item.productid].featureImage[0]}
                      alt='Feature Image'
                      width={400}
                      height={300}
                    />
                  )}
                  <div className="absolute bg-gradient-to-t from-black top-0 bottom-0 left-0 right-0 flex justify-center items-center duration-300"></div>
                  <button className='absolute top-0 left-0 m-3 bg-black/70 text-1 rounded-full px-3 py-1 font-bold text-[10px]'>
                    For {projects[item.productid].purpose}
                  </button>
                  <button className='absolute bottom-0 left-0 m-3 h-6 text-sm px-2 text-white flex items-center gap-x-2'>
                    <Home color='#0078db' width={20} />{projects[item.productid].type}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}  // Attach delete handler here
                    className='bg-red-600 text-xs rounded-md absolute bottom-0 right-0 m-3 h-6 px-1 text-white flex items-center gap-x-2 hover:scale-125 duration-300'
                  >
                    <Heart size={15} /> Delete
                  </button>
                  <Link href={`/page/singlepage/${projects[item.productid].slug}`}> 
                    <button
                      className='bg-blue-600 text-xs rounded-md absolute top-0 right-0 m-3 h-6 px-1 text-white flex items-center gap-x-2 hover:scale-125 duration-300'
                    >
                      <Heart size={15} /> Show
                    </button>  
                  </Link>
                </div>
                <div className="flex h-60 flex-col justify-between">
                  <div className="flex flex-col h-full justify-between">
                    <div className='p-4'>
                      <h3 className='text-xl font-bold'>₹ {projects[item.productid].price}</h3>
                      <p className='font-semibold text-lg'>Real Estate</p>
                      <div className='flex items-center gap-x-2 mt-2 mb-1'>
                        <MapPinned width={18} color='#0078db' />
                        <span className='text-sm font-medium'>
                          {projects[item.productid].address.houseNumber}, {projects[item.productid].address.colony}, {projects[item.productid].address.area}, {projects[item.productid].address.city}
                        </span>
                      </div>
                      <div className="flex gap-x-4 mt-3">
                        <div className='flex items-center gap-x-1'>
                          <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                            <BedDouble width={12} color='#fff' />
                          </div>
                          <span className='text-[12px] ms-1'>{projects[item.productid].bedrooms}</span>
                        </div>
                        <div className='flex items-center gap-x-1'>
                          <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                            <Bath width={12} color='#fff' />
                          </div>
                          <span className='text-[12px] ms-1'>{projects[item.productid].bathrooms}</span>
                        </div>
                        <div className='flex items-center gap-x-1'>
                          <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                            <PencilRuler width={12} color='#fff' />
                          </div>
                          <span className='text-[12px] ms-1'>{projects[item.productid].size} SQFT</span>
                        </div>
                      </div>
                    </div>
                    <div className='border-t flex justify-between items-center p-4'>
                      <Image alt='' src="/logo/Group 349 (2).svg" width={150} height={38.625} />
                      <span className='text-sm text-gray-500'>
                        {new Date(projects[item.productid].createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
