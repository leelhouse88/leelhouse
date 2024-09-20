"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '@/app/admin/components/Input/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Select from '@/app/admin/components/Input/Select';
export default function Update2({ params }) {
    const id = params.id;
    const router = useRouter();
    const [formData, setFormData] = useState({
        address: {
            houseNumber: '',
            colony: '',
            area: '',
            landmark: '',
            city: '',
            pincode: '',
            state: 'Rajasthan',
            country: 'India',
        },

        title: '',
        location: '',
        price: '',
        type: '',
        propertyname: '',

        size: '',
        floor: '',
        bedrooms: '',
        bathrooms: '',
        landSize: '',
        yearBuilt: '',
        category: '',
        status: '',
        amenities: [""],
        features: [""],
        listingType: "New Listing",
        dateListed: new Date().toISOString().split("T")[0],
        energyRating: "",
        purpose: "",
        nearbyFacilities: [""],
        parkingSpaces: 0,
        description: "",
        propertyType: "",
        yearRenovated: 0,
        hasGarage: false,
        hasPool: false,
        hasGarden: false,
        heatingType: "",
        coolingType: "",
        securityFeatures: [""],
        flooringType: "",
        viewType: "",
        petFriendly: false,
    });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`/api/project/fetch-single/${id}`);
                const project = response.data.project;

                if (project) {
                    setFormData({
                        address: {
                            houseNumber: project.address.houseNumber || '',
                            colony: project.address.colony || '',
                            area: project.address.area || '',
                            landmark: project.address.landmark || '',
                            city: project.address.city || '',
                            pincode: project.address.pincode || '',
                            state: project.address.state || '',
                            country: project.address.country || 'India',
                        },

                        title: project.title || '',
                        location: project.location || '',
                        price: project.price || '',
                        type: project.type || '',
                        propertyname: project.propertyname || '',
                        size: project.size || '',
                        floor: project.floor || '',
                        bedrooms: project.bedrooms || '',
                        bathrooms: project.bathrooms || '',
                        landSize: project.landSize || '',
                        yearBuilt: project.yearBuilt || '',
                        category: project.category || '',
                        status: project.status || '',
                        amenities: project.amenities?.length ? project.amenities : [""],
                        features: project.features?.length ? project.features : [""],
                        listingType: project.listingType || "New Listing",
                        dateListed: project.dateListed || new Date().toISOString().split("T")[0],
                        energyRating: project.energyRating || "",
                        purpose: project.purpose || "",
                        nearbyFacilities: project.nearbyFacilities?.length ? project.nearbyFacilities : [""],
                        parkingSpaces: project.parkingSpaces || 0,
                        description: project.description || "",
                        propertyType: project.propertyType || "",
                        yearRenovated: project.yearRenovated || 0,
                        hasGarage: project.hasGarage || false,
                        hasPool: project.hasPool || false,
                        hasGarden: project.hasGarden || false,
                        heatingType: project.heatingType || "",
                        coolingType: project.coolingType || "",
                        securityFeatures: project.securityFeatures?.length ? project.securityFeatures : [""],
                        flooringType: project.flooringType || "",
                        viewType: project.viewType || "",
                        petFriendly: project.petFriendly || false,
                    });
                } else {
                    toast.error("Project data could not be loaded.");
                }
            } catch (error) {
                console.error('Error fetching project data:', error);
                toast.error("Failed to fetch project data.");
            }
        }

        fetchProjectData();
    }, [id]);






    const handleArrayChange = (index, field, value) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData((prev) => ({
            ...prev,
            [field]: updatedArray,
        }));
    };

    const addField = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));
    };

    const removeField = (index, field) => {
        const updatedArray = [...formData[field]];
        updatedArray.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            [field]: updatedArray,
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const response = await axios.patch('/api/project/update', { id, ...formData });

            toast.success("Property Updated Successfully");
            const newProjectId = response.data?.projectid;

        } catch (error) {
            console.error('Error updating project:', error);
            toast.error("Failed to update property.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className=" p-2 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Details</h2>

            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="space-y-4">

                        <div className="flex flex-col gap-4">
                            <div className=' p-4 lg:col-span-2 border-l-4 bg-gray-50  rounded-md border border-[#005ca8]'>
                                <h4 className=' text-xl text-2 font-semibold mb-4'>Type / Price / Location</h4>
                                <div className=' grid lg:grid-cols-2 gap-4 p-4 lg:col-span-2'>
                                    <div>
                                        <Select
                                            name="title"
                                            label="Title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>

                                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">City</label>
                                        <select
                                            name="location"
                                            label="Location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full h-8 px-3 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                            required
                                        >
                                            <option value="">SELECT DISTRICT</option>
                                            <option value="AJMER">AJMER</option>
                                            <option value="ALWAR">ALWAR</option>
                                            <option value="BANSWARA">BANSWARA</option>
                                            <option value="BARAN">BARAN</option>
                                            <option value="BARMER">BARMER</option>
                                            <option value="BHARATPUR">BHARATPUR</option>
                                            <option value="BHILWARA">BHILWARA</option>
                                            <option value="BIKANER">BIKANER</option>
                                            <option value="BUNDI">BUNDI</option>
                                            <option value="CHITTORGARH">CHITTORGARH</option>
                                            <option value="CHURU">CHURU</option>
                                            <option value="DAUSA">DAUSA</option>
                                            <option value="DHOLPUR">DHOLPUR</option>
                                            <option value="DUNGARPUR">DUNGARPUR</option>
                                            <option value="HANUMANGARH">HANUMANGARH</option>
                                            <option value="JAIPUR">JAIPUR</option>
                                            <option value="JAISALMER">JAISALMER</option>
                                            <option value="JALORE">JALORE</option>
                                            <option value="JHALAWAR">JHALAWAR</option>
                                            <option value="JHUNJHUNU">JHUNJHUNU</option>
                                            <option value="JODHPUR">JODHPUR</option>
                                            <option value="KARAULI">KARAULI</option>
                                            <option value="KOTA">KOTA</option>
                                            <option value="NAGAUR">NAGAUR</option>
                                            <option value="PALI">PALI</option>
                                            <option value="PRATAPGARH">PRATAPGARH</option>
                                            <option value="RAJSAMAND">RAJSAMAND</option>
                                            <option value="SAWAI MADHOPUR">SAWAI MADHOPUR</option>
                                            <option value="SIKAR">SIKAR</option>
                                            <option value="SIROHI">SIROHI</option>
                                            <option value="SRI GANGANAGAR">SRI GANGANAGAR</option>
                                            <option value="TONK">TONK</option>
                                            <option value="UDAIPUR">UDAIPUR</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Input
                                            name="price"
                                            label="Price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-600">Type</label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full h-8 px-3  border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                            required
                                        >

                                            <option value="Apartment">Apartment</option>
                                            <option value="House">House</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Commercial">Commercial</option>
                                            <option value="Land">Land</option>
                                            <option value="Office">Office</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Input label="Property Name" name="propertyname" value={formData.propertyname}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            {/* Address */}
                            <div className=' p-4 lg:col-span-2 border-l-4 bg-gray-50  rounded-md border border-[#005ca8]'>
                                <h4 className=' text-xl text-2 font-semibold mb-4'>Property Address</h4>
                                <div className="grid lg:grid-cols-3 gap-4">
                                    <Input label="House Number" name="houseNumber" value={formData.address.houseNumber} onChange={handleAddressChange} disabled={isUpdating} />
                                    <Input label="Colony" name="colony" value={formData.address.colony} onChange={handleAddressChange} disabled={isUpdating} />
                                    <Input label="Area" name="area" value={formData.address.area} onChange={handleAddressChange} disabled={isUpdating} />
                                    <Input label="Landmark" name="landmark" value={formData.address.landmark} onChange={handleAddressChange} disabled={isUpdating} />

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-600">City</label>
                                        <select
                                            name="city"
                                            label="City"
                                            value={formData.address.city} onChange={handleAddressChange} disabled={isUpdating}
                                            className="w-full h-8 px-3 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                            required
                                        >
                                            <option value="">SELECT DISTRICT</option>
                                            <option value="AJMER">AJMER</option>
                                            <option value="ALWAR">ALWAR</option>
                                            <option value="BANSWARA">BANSWARA</option>
                                            <option value="BARAN">BARAN</option>
                                            <option value="BARMER">BARMER</option>
                                            <option value="BHARATPUR">BHARATPUR</option>
                                            <option value="BHILWARA">BHILWARA</option>
                                            <option value="BIKANER">BIKANER</option>
                                            <option value="BUNDI">BUNDI</option>
                                            <option value="CHITTORGARH">CHITTORGARH</option>
                                            <option value="CHURU">CHURU</option>
                                            <option value="DAUSA">DAUSA</option>
                                            <option value="DHOLPUR">DHOLPUR</option>
                                            <option value="DUNGARPUR">DUNGARPUR</option>
                                            <option value="HANUMANGARH">HANUMANGARH</option>
                                            <option value="JAIPUR">JAIPUR</option>
                                            <option value="JAISALMER">JAISALMER</option>
                                            <option value="JALORE">JALORE</option>
                                            <option value="JHALAWAR">JHALAWAR</option>
                                            <option value="JHUNJHUNU">JHUNJHUNU</option>
                                            <option value="JODHPUR">JODHPUR</option>
                                            <option value="KARAULI">KARAULI</option>
                                            <option value="KOTA">KOTA</option>
                                            <option value="NAGAUR">NAGAUR</option>
                                            <option value="PALI">PALI</option>
                                            <option value="PRATAPGARH">PRATAPGARH</option>
                                            <option value="RAJSAMAND">RAJSAMAND</option>
                                            <option value="SAWAI MADHOPUR">SAWAI MADHOPUR</option>
                                            <option value="SIKAR">SIKAR</option>
                                            <option value="SIROHI">SIROHI</option>
                                            <option value="SRI GANGANAGAR">SRI GANGANAGAR</option>
                                            <option value="TONK">TONK</option>
                                            <option value="UDAIPUR">UDAIPUR</option>
                                        </select>
                                    </div>
                                    <Input label="Pincode" name="pincode" value={formData.address.pincode} onChange={handleAddressChange} disabled={isUpdating} />
                                    <Input label="State" disabled name="state"  value={formData.address.state} onChange={handleAddressChange} />
                                    <Input label="Country" disabled name="country" value={formData.address.country} onChange={handleAddressChange} />

                                </div>
                            </div>


                            <div className=' p-4 lg:col-span-2 border-l-4 bg-gray-50  rounded-md border border-[#005ca8]'>
                                <h4 className=' text-xl text-2 font-semibold mb-4'>Property Details</h4>
                                <div className="grid lg:grid-cols-3 gap-4">
                                    <Input label="Size" name="size" type="number" value={formData.size} onChange={handleChange} disabled={isUpdating} />
                                    <Input label="Floor" name="floor" type="number" value={formData.floor} onChange={handleChange} disabled={isUpdating} />
                                    <Input label="Bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} disabled={isUpdating} />
                                    <Input label="Bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} disabled={isUpdating} />
                                    <Input label="Land Size" name="landSize" type="number" value={formData.landSize} onChange={handleChange} disabled={isUpdating} />
                                    <Input label="Year Built" name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} disabled={isUpdating} />

                                </div>
                            </div>




                            <div className=' p-4 lg:col-span-2 border-l-4 bg-gray-50  rounded-md border border-[#005ca8]'>
                                <h4 className=' text-xl text-2 font-semibold mb-4'>Feature</h4>
                                <div className="grid lg:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-600">Buy / Sell</label>
                                        <select name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            required
                                            className="w-full h-8 px-3 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm">
                                            <option value=""></option>
                                            <option value="Buy">Buy</option>
                                            <option value="Rent">Rent</option>

                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-600">Listing Type</label>
                                        <select name="listingType"
                                            value={formData.listingType}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            className="w-full h-8 px-3 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm">
                                            <option value="New Listing">New Listing</option>
                                            <option value="Featured">Featured</option>
                                            <option value="Focus">Focus</option>
                                            <option value="Top Project">Top Project</option>
                                        </select>
                                    </div>
                                    <div>

                                        {formData.amenities.map((amenity, index) => (
                                            <div key={`amenity-${index}`} className="flex items-center">
                                                <Input
                                                    label={`Facility ${index + 1}`}
                                                    name={`amenity-${index}`}
                                                    value={amenity}
                                                    onChange={(e) =>
                                                        handleArrayChange(index, "amenities", e.target.value)
                                                    }
                                                    disabled={isUpdating}
                                                />
                                                {formData.amenities.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-red-600"
                                                        onClick={() => removeField(index, "amenities")}
                                                        disabled={isUpdating}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="text-xs bg-blue-700 mt-2 font-semibold text-white py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            onClick={() => addField("amenities")}
                                            disabled={isUpdating}
                                        >
                                            Add More
                                        </button>
                                    </div>


                                    <div>
                                        {formData.features.map((feature, index) => (
                                            <div key={`feature-${index}`} className="flex items-center">
                                                <Input
                                                    label={`Feature ${index + 1}`}
                                                    name={`feature-${index}`}
                                                    value={feature}
                                                    onChange={(e) =>
                                                        handleArrayChange(index, "features", e.target.value)
                                                    }
                                                    disabled={isUpdating}
                                                />
                                                {formData.features.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-red-600"
                                                        onClick={() => removeField(index, "features")}
                                                        disabled={isUpdating}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="text-xs bg-blue-700 mt-2 font-semibold text-white py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            onClick={() => addField("features")}
                                            disabled={isUpdating}
                                        >
                                            Add More
                                        </button>
                                    </div>

                                    <div>
                                        {formData.nearbyFacilities.map((facility, index) => (
                                            <div
                                                key={`nearbyFacility-${index}`}
                                                className="flex items-center"
                                            >
                                                <Input
                                                    label={`Nearby Facility ${index + 1}`}
                                                    name={`nearbyFacility-${index}`}
                                                    value={facility}
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            index,
                                                            "nearbyFacilities",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={isUpdating}
                                                />
                                                {formData.nearbyFacilities.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-red-600"
                                                        onClick={() => removeField(index, "nearbyFacilities")}
                                                        disabled={isUpdating}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="text-xs bg-blue-700 mt-2 font-semibold text-white py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            onClick={() => addField("nearbyFacilities")}
                                            disabled={isUpdating}
                                        >
                                            Add More
                                        </button>
                                    </div>

                                    <div>
                                        {formData.securityFeatures.map((feature, index) => (
                                            <div
                                                key={`securityFeature-${index}`}
                                                className="flex items-center"
                                            >
                                                <Input
                                                    label={`Security Feature ${index + 1}`}
                                                    name={`securityFeature-${index}`}
                                                    value={feature}
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            index,
                                                            "securityFeatures",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={isUpdating}
                                                />
                                                {formData.securityFeatures.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-red-600"
                                                        onClick={() => removeField(index, "securityFeatures")}
                                                        disabled={isUpdating}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="text-xs bg-blue-700 mt-2 font-semibold text-white py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            onClick={() => addField("securityFeatures")}
                                            disabled={isUpdating}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className=' p-4 lg:col-span-2 border-l-4 bg-gray-50  rounded-md border border-[#005ca8]'>
                                <h4 className=' text-xl text-2 font-semibold mb-4'>Property Details</h4>
                                <div className="grid lg:grid-cols-3 gap-4">
                                    <Input
                                        label="Energy Rating"
                                        name="energyRating"
                                        value={formData.energyRating}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />



                                    <Input
                                        label="Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />
                                    <Input
                                        label="Property Type"
                                        name="propertyType"
                                        value={formData.propertyType}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />
                                    <Input
                                        label="Year Renovated"
                                        name="yearRenovated"
                                        type="number"
                                        value={formData.yearRenovated}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />

                                    <Input
                                        label="Heating Type"
                                        name="heatingType"
                                        value={formData.heatingType}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />
                                    <Input
                                        label="Cooling Type"
                                        name="coolingType"
                                        value={formData.coolingType}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />
                                    <Input
                                        label="Flooring Type"
                                        name="flooringType"
                                        value={formData.flooringType}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />
                                    <Input
                                        label="View Type"
                                        name="viewType"
                                        value={formData.viewType}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />
                                    <Input
                                        label="Parking Spaces"
                                        name="parkingSpaces"
                                        type="number"
                                        value={formData.parkingSpaces}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    />
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="hasGarage"
                                            checked={formData.hasGarage}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="ml-2 text-sm text-gray-900">Has Garage</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="hasPool"
                                            checked={formData.hasPool}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="ml-2 text-sm text-gray-900">Has Pool</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="hasGarden"
                                            checked={formData.hasGarden}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="ml-2 text-sm text-gray-900">Has Garden</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="petFriendly"
                                            checked={formData.petFriendly}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="ml-2 text-sm text-gray-900">Pet Friendly</label>
                                    </div>
                                </div>
                            </div>


                            <div className=' p-4 lg:col-span-2 border-l-4 bg-gray-50  rounded-md border border-[#005ca8]'>
                                <h4 className=' text-xl text-2 font-semibold mb-4'>Status</h4>
                                <div className="grid lg:grid-cols-3 gap-4">
                                    <select
                                        id="status"
                                        name="status"
                                        className="w-full h-8 px-3 py-2 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                                        value={formData.status}
                                        onChange={handleChange}
                                        disabled={isUpdating}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Sold">Sold</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Under Offer">Under Offer</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>




                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-700 mt-4 font-semibold text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
}
