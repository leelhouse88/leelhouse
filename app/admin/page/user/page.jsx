"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loader/Loading';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // User selected for updating
    const [newUserType, setNewUserType] = useState('');
    const [filter, setFilter] = useState('all'); // Filter by 'all', 'admin', 'user'
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(9); // Number of users per page (3 columns * 3 rows)

    const { data: session, status } = useSession();
    const useremail = session?.user?.email;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/getdata/admin');
                setUsers(response.data.fetch);
            } catch (err) {
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <Loading />;
    if (error) return <p className="text-lg text-red-600">{error}</p>;

    const handleWhatsAppClick = (mobile) => {
        const url = `https://wa.me/${mobile}`;
        window.open(url, '_blank');
    };

    const handleUserTypeChange = (user) => {
        setSelectedUser(user);
        setNewUserType(user.usertype);
    };

    const updateUserType = async () => {
        try {
            await axios.patch('/api/admin/update/email', {
                email: selectedUser.email,
                usertype: newUserType,
            });
            window.location.reload();
            setSelectedUser(null);
        } catch (error) {
            alert('Error updating user type');
        }
    };

    // Filter out the user whose email is equal to useremail
    const filteredUsers = users.filter(user => user.email !== useremail);

    // Apply role filter
    const roleFilteredUsers = filter === 'all' ? filteredUsers : filteredUsers.filter(user =>
        (filter === 'admin' && user.usertype === '2') ||
        (filter === 'user' && user.usertype === '1')
    );

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = roleFilteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(roleFilteredUsers.length / usersPerPage);

    return (
        <div className="py-4 bg-gray-100">
            <div className="mb-4">
                <label className="mr-2">Filter by role:</label>
                <select
                    className="border p-2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            {currentUsers.length === 0 ? (
                <p className="text-lg text-gray-700">No users found.</p>
            ) : (
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
                    {currentUsers.map((user, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                            <div className="flex flex-col ">
                                <div className='relative'>
                                    <p className="text-lg font-semibold">{user.name}</p>
                                    <p className="text-gray-600 ">{user.email}</p>
                                    <div className='absolute -top-5 -left-2 text-white rounded-md text-xs px-2 py-0.5 bg-2'>
                                        {user.usertype === "1" ? 'User' : user.usertype === "2" ? 'Admin' : 'Unknown'}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col  gap-2 mt-4">
                                <div className=' flex items-center justify-between'>
                                    <p className="font-semibold">{user.mobile}</p>
                                    <button onClick={() => handleWhatsAppClick(user.mobile)}>
                                        <Image src="/image/whatsapp.webp" alt="WhatsApp" width={30} height={30} />
                                    </button>
                                </div>
                                <button onClick={() => handleUserTypeChange(user)} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">Update User Type</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedUser && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Update User Type for {selectedUser.name}</h2>
                        <select
                            className="border p-2 mb-4"
                            value={newUserType}
                            onChange={(e) => setNewUserType(e.target.value)}
                        >
                            <option value="1">User</option>
                            <option value="2">Admin</option>
                        </select>
                        <div className="flex gap-4">
                            <button onClick={updateUserType} className="px-4 py-2 bg-green-600 text-white rounded">Update</button>
                            <button onClick={() => setSelectedUser(null)} className="px-4 py-2 bg-red-600 text-white rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                    Previous
                </button>
                <p className="self-center">{`Page ${currentPage} of ${totalPages}`}</p>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
