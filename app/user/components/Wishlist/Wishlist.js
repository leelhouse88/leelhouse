"use client";
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function Wishlist() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState({});

  const useremail = session?.user?.email;

  // Fetch user data without caching
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (useremail) {
          const response = await axios.get(`/api/admin/find-admin-byemail/${useremail}`);
          setUserData(response.data._id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    if (useremail) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [useremail]);

  // Fetch wishlist items for the user without caching
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (userData) {
          const response = await axios.get(`/api/Wishlist/find-byuserid/${userData}`);
          setWishlist(response.data);
        }
      } catch (err) {
        setError('No Wishlist Avaliable');
      }
    };

    if (userData) {
      fetchWishlist();
    }
  }, [userData]);

  // Fetch project details without caching
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
      } finally {
        setLoading(false);
      }
    };

    wishlist.forEach(item => {
      if (!projects[item.productid]) {
        fetchProjectDetails(item.productid);
      }
    });
  }, [wishlist, projects]);

  const renderedWishlist = useMemo(() => {
    return wishlist.slice(0, 3).map((item) => (
      <div key={item.productid}>
        {projects[item.productid] ? (
          <li className="bg-white text-2 p-3 rounded-lg shadow hover:bg-purple-50 transition">
            <p className="font-semibold">{projects[item.productid].title}</p>
            <span className="text-sm text-gray-500">
              Added on: {new Date(item.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
            </span>
          </li>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    ));
  }, [wishlist, projects]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {wishlist.length > 0 ? renderedWishlist : (
        <div className="text-center text-gray-500">No items in wishlist</div>
      )}
    </ul>
  );
}
