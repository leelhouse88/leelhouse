import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default function Tabbanner({ location, setLocation, motive, setMotive, type, setType }) {
    const [city, setCity] = useState([]);
    const [services, setServices] = useState([]);
    const [options, setOptions] = useState([]);
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

        // Only proceed if both location and type have values
        if (location) {
            setLocation(location);
            setType(type);
            setMotive(searchType);
        }
        toast.success("Search result")
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
                setCity(response.data.cities)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {

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
            } finally {

            }
        };

        fetchService();
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
        <div className="bg-white shadow-lg rounded-2xl p-2 md:p-6 mx-auto max-w-4xl">
             <Toaster />
            <h2 className="text-xl font-normal mb-5 text-center">Discover Properties</h2>
            <Tabs>
                <TabList className="flex flex-wrap  mb-4">
                    <Tab className="flex-1 py-3 px-4 text-center cursor-pointer transition-colors duration-300 focus:outline-none bg-gray-200 rounded-md mx-1" selectedClassName="text-white bg-2">
                        Buy
                    </Tab>
                    <Tab className="flex-1 py-3 px-4 text-center cursor-pointer transition-colors duration-300 focus:outline-none bg-gray-200 rounded-md mx-1" selectedClassName="text-white bg-2">
                        Rent
                    </Tab>
                    <Tab className="flex-1 py-3 px-4 text-center cursor-pointer transition-colors duration-300 focus:outline-none bg-gray-200 rounded-md mx-1" selectedClassName="text-white bg-2">
                        Service
                    </Tab>
                </TabList>

                <TabPanel>
                    <form onSubmit={(e) => handleSearch(e, 'Buy')}>


                        <div className="flex flex-col gap-4">

                            <label htmlFor="RentLocation" className='block -mb-[14px] text-[12px] font-medium text-gray-700'> City</label>
                            <select
                                name="BuyLocation"
                                value={formData.BuyLocation}
                                onChange={handleInputChange}
                                required
                                className=" block w-ful h-full px-3 py-3 border border-gray-300 rounded-md    focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"

                            >
                                <option value="">Select City</option>
                                {city.map((item) => (
                                    <option key={item.id} selected value={item}>{item}</option>
                                ))}

                            </select>


                            <label htmlFor="BuyType" className='block -mb-[14px] text-[12px] font-medium text-gray-700'> Property Type</label>
                            <select
                                name="BuyType"
                                value={formData.BuyType}
                                onChange={handleInputChange}
                                className=" block w-full  h-full px-3 py-3 border border-gray-300 rounded-md    focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                required
                            >
                                <option value="">Select Type</option>
                                {options.map((item) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}

                            </select>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button type="submit" className="w-full flex font-medium justify-center items-center gap-x-2 py-3 px-4 bg-2 text-white rounded-lg hover:bg-[#ffaa3e] transition-colors duration-300 focus:outline-none">
                                Search
                            </button>
                        </div>
                    </form>
                </TabPanel>

                <TabPanel>
                    <form onSubmit={(e) => handleSearch(e, 'Rent')}>
                    <div className="flex flex-col gap-4">


                            <label htmlFor="RentLocation" className='block -mb-[14px] text-[12px] font-medium text-gray-700'> City</label>
                            <select name="RentLocation"
                                value={formData.RentLocation}
                                onChange={handleInputChange}
                                required
                                className=" block w-full  h-full px-3 py-3 border border-gray-300 rounded-md   focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"

                            >
                                <option value="">Select City</option>
                                {city.map((item) => (
                                    <option key={item.id} selected value={item}>{item}</option>
                                ))}
                            </select>


                            <label htmlFor="RentType" className='block -mb-[14px] text-[12px] font-medium text-gray-700'> Property Type</label>
                            <select
                                name="RentType"
                                value={formData.RentType}
                                onChange={handleInputChange}
                                required
                                 className=" block w-full h-full px-3 py-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"

                            >
                                <option value="">Select Type</option>

                                {options.map((item) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button type="submit"  className="w-full flex font-medium justify-center items-center gap-x-2 py-3 px-4 bg-2 text-white rounded-lg hover:bg-[#ffaa3e] transition-colors duration-300 focus:outline-none">
                                Search
                            </button>
                        </div>
                    </form>
                </TabPanel>

                <TabPanel>
                    <form onSubmit={handleServiceSearch}>
                    <div className="flex flex-col gap-4">

                            <label htmlFor="ger" className='block -mb-[14px] text-[12px] font-medium text-gray-700'> City</label>

                            <select
                                id="ger"
                                name="serviceLocation"
                                value={formData.serviceLocation}
                                onChange={handleInputChange}
                                 className=" block w-full  h-full px-3 py-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"

                            >
                                <option value="">Select Ciity</option>
                                {city.map((item) => (
                                    <option key={item.id} selected value={item}>{item}</option>
                                ))}
                            </select>

                            <label htmlFor="serviceType" className='block -mb-[14px] text-[12px] font-medium text-gray-700'> Service Type</label>
                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleInputChange}
                               className=" block w-full  h-full px-3 py-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            >
                                <option value="">Select Service</option>
                                {services.map((item) => (

                                    <option key={item.id} value={item.title}>{item.title}</option>
                                ))}

                            </select>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="w-full flex font-medium justify-center items-center gap-x-2 py-3 px-4 bg-2 text-white rounded-lg hover:bg-[#ffaa3e] transition-colors duration-300 focus:outline-none">
                            
                                Search
                            </button>
                        </div>
                    </form>
                </TabPanel>
            </Tabs>
        </div>
    );
}
