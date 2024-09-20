"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loader/Loading';

import Link from 'next/link';
import Wishlist from '../Wishlist/Wishlist';
import Service from '../Service/Service';
export default function Dashboard() {



  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userDataall, setUserDataall] = useState(null);
  const [projects, setProjects] = useState({});

  const useremail = session?.user?.email;

  // Fetch user data
  useEffect(() => {
    if (useremail) {
      axios.get(`/api/admin/find-admin-byemail/${useremail}`)
        .then(response => {
          setUserData(response.data._id);
          setUserDataall(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [useremail]);


  if (loading) return <Loading />;
  return (
    <>
      <div className="lg:p-4 p-2">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="shadow-lg p-5 border bg-2 rounded-lg text-white md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="bg-white text-blue-600 p-4 rounded-lg shadow">
              <p className="text-xl font-semibold">{userDataall?.name}</p>
              <p className="text-gray-600">Email: {userDataall?.email}</p>
              <p className="text-gray-600">Phone: {userDataall?.mobile}</p>

            </div>
          </div>


          <div className="shadow-lg p-5 border bg-2 rounded-lg text-white">
            <div className=' flex justify-between'>
              <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
              <Link href="/user/page/wishlist"> <h2 className="text-2xl font-bold mb-4">View All</h2></Link>
            </div>
           <Wishlist/>
          </div>


          <div className="shadow-lg p-5 border bg-gradient-to-r from-green-600 to-teal-600 rounded-lg text-white">
          <div className=' flex justify-between'>
              <h2 className="text-2xl font-bold mb-4">Service</h2>
              <Link href="/user/page/service"> <h2 className="text-2xl font-bold mb-4">View All</h2></Link>
            </div>
          <Service/>
          </div>


        </div>
      </div>
    </>
  );
}
