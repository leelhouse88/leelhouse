import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Tabbanner({ location, setLocation, motive, setMotive, type, setType }) {
    const [city, setCity] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        BuyLocation: '',
        BuyType: '',
        RentLocation: '',
        RentType: '',
        serviceLocation: '',
        serviceType: '',
    });

    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearch = (e, searchType) => {
        e.preventDefault();
        const location = formData[`${searchType}Location`];
        const type = formData[`${searchType}Type`];

        if (location) {
            setLocation(location);
            setType(type);
            setMotive(searchType);
        }
        toast.success("Search result");
    };

    const handleServiceSearch = (e) => {
        e.preventDefault();
        const { serviceLocation, serviceType } = formData;

        if (serviceLocation && serviceType) {
            router.push(`/page/service/${serviceType},${serviceLocation}`);
        } else if (serviceLocation) {
            router.push(`/page/service/${serviceLocation}`);
        } else {
            router.push(`/page/service/${serviceType}`);
        }
    };

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await axios.get("/api/project/findallcity/project");
                setCity(response.data.cities);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCity();
    }, []);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get('/api/AddService/getdata/addservice');
                setServices(response.data.fetch);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchService();
    }, []);



    const handlePropertyTypeChange = (type, searchType) => {
        setFormData((prevState) => ({
            ...prevState,
            [`${searchType}Type`]: type,
        }));
    };

    return (
        <div className=" lg:bg-white bg-white fixed flex flex-col justify-center lg:relative top-0 left-0 right-0 bottom-0 shadow-lg rounded-2xl p-2 md:p-6 mx-auto max-w-4xl">
            <Toaster />
            <h2 className="lg:text-xl py-2 lg:py-0 rounded-md text-3xl bg-2 lg:text-black text-white lg:bg-white font-normal lg:mb-5 mb-8 text-center">Discover Properties</h2>
            <Tabs>
                <TabList className="flex flex-wrap lg:mb-4 mb-8">
                    <Tab className="flex-1 py-1 md:py-1 px-4 text-center cursor-pointer transition-colors duration-300 focus:outline-none bg-gray-200 rounded-md mx-1" selectedClassName="text-white bg-2">
                        Buy
                    </Tab>
                    <Tab className="flex-1 py-1 md:py-1 px-4 text-center cursor-pointer transition-colors duration-300 focus:outline-none bg-gray-200 rounded-md mx-1" selectedClassName="text-white bg-2">
                        Rent
                    </Tab>
                    <Tab className="flex-1 py-1 md:py-1 px-4 text-center cursor-pointer transition-colors duration-300 focus:outline-none bg-gray-200 rounded-md mx-1" selectedClassName="text-white bg-2">
                        Service
                    </Tab>
                </TabList>

                {/* Buy Tab */}
                <TabPanel>
                    <form onSubmit={(e) => handleSearch(e, 'Buy')}>
                        <div className="flex flex-col gap-4">


                            <label className="block -mb-[14px] text-[12px] font-medium lg:text-black">Property Type</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => handlePropertyTypeChange('Apartment', 'Buy')}
                                    className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Apartment' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                >
                                    Apartment
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handlePropertyTypeChange('House', 'Buy')}
                                    className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'House' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                >
                                    House
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handlePropertyTypeChange('Villa', 'Buy')}
                                    className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Villa' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                >
                                    Villa
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handlePropertyTypeChange('Commercial', 'Buy')}
                                    className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Commercial' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                >
                                    Commercial
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handlePropertyTypeChange('Land', 'Buy')}
                                    className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Land' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                >
                                    Land
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handlePropertyTypeChange('Office', 'Buy')}
                                    className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Office' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                >
                                    Office
                                </button>
                            </div>


                            <label htmlFor="BuyLocation" className="block -mb-[14px] text-[12px] font-medium text-black"> City</label>
                            <select
                                name="BuyLocation"
                                value={formData.BuyLocation}
                                onChange={handleInputChange}
                                required
                                className="block w-full h-8 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            >
                                <option value="">Select City</option>
                                {city.map((item) => (
                                    <option key={item.id} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center lg:mt-4 mt-12">
                            <button type="submit" className="w-full flex font-medium justify-center items-center gap-x-2 py-3 px-4 bg-2 text-white rounded-lg hover:bg-[#ffaa3e] transition-colors duration-300 focus:outline-none">
                                Search
                            </button>
                        </div>
                    </form>
                </TabPanel>

                {/* Rent Tab */}
                <TabPanel>
                    <form onSubmit={(e) => handleSearch(e, 'Rent')}>
                        <div className="flex flex-col gap-4">

                            <label className="block -mb-[14px] text-[12px] font-medium text-black">Property Type</label>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handlePropertyTypeChange('Apartment', 'Rent')}
                                        className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Apartment' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                    >
                                        Apartment
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handlePropertyTypeChange('House', 'Rent')}
                                        className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'House' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                    >
                                        House
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handlePropertyTypeChange('Villa', 'Rent')}
                                        className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Villa' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                    >
                                        Villa
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handlePropertyTypeChange('Commercial', 'Rent')}
                                        className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Commercial' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                    >
                                        Commercial
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handlePropertyTypeChange('Land', 'Rent')}
                                        className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Land' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                    >
                                        Land
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handlePropertyTypeChange('Office', 'Rent')}
                                        className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.BuyType === 'Office' ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                    >
                                        Office
                                    </button>
                                </div>

                            </div>

                            <label htmlFor="RentLocation" className="block -mb-[14px] text-[12px] font-medium text-black"> City</label>
                            <select
                                name="RentLocation"
                                value={formData.RentLocation}
                                onChange={handleInputChange}
                                required
                                className="block w-full h-8 px-3 py-1  border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            >
                                <option value="">Select City</option>
                                {city.map((item) => (
                                    <option key={item.id} value={item}>{item}</option>
                                ))}
                            </select>

                        </div>
                        <div className="flex justify-center  lg:mt-4 mt-12">
                            <button type="submit" className="w-full flex font-medium justify-center items-center gap-x-2 py-3 px-4 bg-2 text-white rounded-lg hover:bg-[#ffaa3e] transition-colors duration-300 focus:outline-none">
                                Search
                            </button>
                        </div>
                    </form>
                </TabPanel>

                {/* Service Tab */}
                <TabPanel>
                    <form onSubmit={handleServiceSearch}>
                        <div className="flex flex-col gap-4">


                            <label className="block -mb-[14px] text-[12px] font-medium text-black">Service Type</label>
                            <div className="flex flex-wrap gap-2">
                                {services.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handlePropertyTypeChange(item.title, 'service')}
                                        className={`py-0.5 px-2 text-sm capitalize rounded-md ${formData.serviceType === item.title ? 'bg-2 text-white' : 'border border-gray-300 text-black'} transition-colors duration-300`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>

                            <label htmlFor="serviceLocation" className="block -mb-[14px] text-[12px] font-medium text-black"> City</label>
                            <select
                                id="serviceLocation"
                                name="serviceLocation"
                                value={formData.serviceLocation}
                                onChange={handleInputChange}
                                className="block w-full h-8 px-3 py-1  border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            >
                                <option value="">Select City</option>
                                {city.map((item) => (
                                    <option key={item.id} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center  lg:mt-4 mt-12">
                            <button type="submit" className="w-full flex font-medium justify-center items-center gap-x-2 py-3 px-4 bg-2 text-white rounded-lg hover:bg-[#ffaa3e] transition-colors duration-300 focus:outline-none">
                                Search
                            </button>
                        </div>
                    </form>
                </TabPanel>
            </Tabs>
        </div>
    );
}
