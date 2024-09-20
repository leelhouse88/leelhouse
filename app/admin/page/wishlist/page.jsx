"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Loading from '@/components/Loader/Loading';
import { BedDouble, Bath, PencilRuler, MapPinned, Home, Heart } from 'lucide-react';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState({});
    const [selectedUser, setSelectedUser] = useState(''); // For dropdown filter
    const [currentPage, setCurrentPage] = useState(1); // For pagination
    const projectsPerPage = 3; // Number of projects per page

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/admin/getdata/admin');
                setUsers(response.data.fetch);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/Wishlist/fetchall/Wishlist');
                setWishlist(response.data.fetch);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
    }, [wishlist, projects]);

    const getUserById = (userId) => {
        return users.find(u => u._id === userId);
    };

    const groupProjectsByUser = () => {
        const grouped = {};
        wishlist.forEach(item => {
            const user = getUserById(item.userid);
            if (user) {
                if (!grouped[user._id]) {
                    grouped[user._id] = { user, projects: [] };
                }
                grouped[user._id].projects.push(item.productid);
            }
        });
        return grouped;
    };

    const groupedProjects = groupProjectsByUser();

    // Filtered users
    const filteredUsers = Object.values(groupedProjects).filter(({ user }) => 
        user.name.toLowerCase().includes(selectedUser.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredUsers.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) return <Loading />;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <>
           
            <div className="mb-4">
                <select
                    className="border p-2 rounded"
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                >
                    <option value="">All Users</option>
                    {Object.values(groupedProjects).map(({ user }) => (
                        <option key={user._id} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="">
                {currentProjects.map(({ user, projects: userProjects }) => (
                    <div key={user._id} className="mb-8">
                        <div className="font-bold text-lg mb-4">
                            {user.name}
                        </div>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2">
                            {userProjects.map(productid => {
                                const project = projects[productid];
                                if (!project) return null;

                                return (
                                    <div key={productid}>
                                        <div className="group rounded-md bg-white overflow-hidden my-1 lg:mb-4 mx-3 backdrop-blur-md border  duration-150">
                                            <div className="overflow-hidden relative">
                                                {project.featureImage.length > 0 && (
                                                    <Image
                                                        className='object-cover h-60 w-full transition duration-300 ease-in-out transform group-hover:scale-105'
                                                        key={project.featureImage[0].id}
                                                        src={project.featureImage[0]}
                                                        alt=''
                                                        width={400}
                                                        height={300}
                                                    />
                                                )}
                                                <div className="absolute bg-gradient-to-t from-black top-0 bottom-0 left-0 right-0 flex justify-center items-center duration-300">
                                                </div>
                                                <button className='absolute top-0 left-0 m-3 bg-black/70 text-1 rounded-full px-3 py-1 font-bold text-[10px]'>For {project.purpose}</button>
                                                <button className='absolute bottom-0 left-0 m-3 h-6 text-sm px-2 text-white flex items-center gap-x-2'>
                                                    <Home color='#0078db' width={20} />{project.type}
                                                </button>
                                            </div>
                                            <div className="flex h-60 flex-col justify-between">
                                                <div className="flex flex-col h-full justify-between">
                                                    <div className='p-4'>
                                                        <h3 className='text-xl font-bold text-'>₹ {project.price}</h3>
                                                        <p className='font-semibold text-lg'>Real Estate</p>
                                                        <div className='flex items-center gap-x-2 mt-2 mb-1'>
                                                            <MapPinned width={18} color='#0078db' />
                                                            <span className='text-sm font-medium'>{project.address.houseNumber}, {project.address.colony}, {project.address.area}, {project.address.city}</span>
                                                        </div>
                                                        <div className="flex gap-x-4 mt-3">
                                                            <div className='flex items-center gap-x-1'>
                                                                <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                                                                    <BedDouble width={12} color='#fff' />
                                                                </div>
                                                                <span className='text-[12px] ms-1'>{project.bedrooms}</span>
                                                            </div>
                                                            <div className='flex items-center gap-x-1'>
                                                                <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                                                                    <Bath width={12} color='#fff' />
                                                                </div>
                                                                <span className='text-[12px] ms-1'>{project.bathrooms}</span>
                                                            </div>
                                                            <div className='flex items-center gap-x-1'>
                                                                <div className='flex items-center justify-center w-6 h-6 bg-[#ffaa3e] rounded-full'>
                                                                    <PencilRuler width={12} color='#fff' />
                                                                </div>
                                                                <span className='text-[12px] ms-1'>{project.size} SQFT</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='border-t flex justify-between items-center p-4'>
                                                        <Image alt='' src="/logo/Group 349 (2).svg" width={150} height={38.625} />
                                                        <span className='text-sm text-gray-500'>{new Date(project.createdAt).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: '2-digit',
                                                        })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

          
        </>
    );
}
