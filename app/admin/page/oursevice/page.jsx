"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServicePopup from '../../components/ServicePopup/ServicePopup';
import Loading from '@/components/Loader/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddServiceForm from '../../components/addservice/AddService';

export default function ServiceList() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 5;

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

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setSelectedService(null);
    };

    const handleDeleteService = async (_id) => {
        try {
            await axios.delete(`/api/AddService/delete/${_id}`);
            // toast.success("Service Deleted Successfully");
            fetchServices(); // Refetch services after deletion
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const totalPages = Math.ceil(services.length / servicesPerPage);
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    const currentServices = services.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return  (
        <div>
            <AddServiceForm onServiceAdded={fetchServices} />
            <ToastContainer />
            <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                <div className='mb-0 md:mb-2'>
                    <p className='text-gray-600 text-2 text-xs md:text-sm'>
                        Showing {startIndex + 1} to {Math.min(endIndex, services.length)} of {services.length}
                    </p>
                </div>
                <div className='flex justify-between md:justify-end w-full md:w-fit flex-row md:items-center gap-y-2 md:gap-x-4'>
                    <div className='flex gap-1 md:gap-2 mt-2 md:mt-0'>
                        <button
                            className={`bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <button className='bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize'>
                            {currentPage}
                        </button>
                        <button
                            className={`bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Services List</h2>
                    {currentServices.map((service, index) => (
                        <div
                            key={index}
                            className="grid lg:grid-cols-5 my-2 shadow-md border gap-2 cursor-pointer"
                            onClick={() => handleServiceClick(service)}
                        >
                            <div className="lg:col-span-1 bg-2 rounded-md px-2 text-white flex items-center">{service.title}</div>
                            <div className="lg:col-span-4 rounded-md px-2 text-gray-800 line-clamp-1 leading-9">{service.description}</div>
                        </div>
                    ))}

                    {isPopupVisible && selectedService && (
                        <ServicePopup
                            service={selectedService}
                            onClose={handleClosePopup}
                            onDelete={handleDeleteService}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
