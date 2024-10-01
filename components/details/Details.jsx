import React from 'react'
import { LocateIcon, CarIcon, TreesIcon, WindIcon, HeaterIcon, Waves } from "lucide-react"

import Overview from '@/components/card/overview/Overview'

export default function Details({ item }) {
    return (
        <>
            <div className=" p-2 md:p-0">

                <div className=" space-y-6">

                    <div className="bg-white p-5 shadow-md rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <LocateIcon width={40} color='#0078db' />
                            </div>
                            <div>
                                <p className="text-zinc-500 font-semibold">Property Location</p>
                                <p className="font-medium text-lg text-zinc-700">
                                    {item.address.houseNumber}, {item.address.colony}, {item.address.area}, {item.address.city}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg">
                        <div className="p-4 border-b">
                            <p className="text-xl font-semibold text-zinc-700">Parth Crown Overview</p>
                        </div>
                        <div className="p-4">
                            <Overview item={item} />
                        </div>
                    </div>

                    <div className="shadow-lg rounded-xl overflow-hidden relative">
                        <div className=' absolute top-0 right-0 bg-yellow-500 px-4 rounded-bl-full text-white font-medium py-0.5 text-sm'>Highlight</div>
                        <div className="p-6 bg-gradient-to-r from-[#004687] via-[#005ca8] to-[#0074cc] border-b-4 border-[#003366]">
                            <p className="text-2xl font-bold text-white tracking-wide">
                                About This Project
                            </p>
                        </div>
                        <div className="p-6 bg-white">
                            <p className="text-md text-gray-700 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>



                    <div className="bg-white shadow-md rounded-lg">
                        <div className="p-4 border-b">
                            <p className="text-xl font-semibold text-zinc-700">Project Amenities</p>
                        </div>
                        <div className="p-4 flex flex-wrap gap-2 text-sm text-gray-700">
                            {item.amenities.map((amenity, index) => (
                                <div key={index} className="px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                                    {amenity}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg">
                        <div className="p-4 border-b">
                            <p className="text-xl font-semibold text-zinc-700">Project Facility</p>
                        </div>
                        <div className="p-4 flex flex-wrap gap-4 text-sm text-gray-700">
                            {item.features.map((feature, index) => (
                                <div key={index} className="px-3 py-1 bg-green-50 rounded-full border border-green-200">
                                    {feature}
                                </div>
                            ))}

                            {item.hasGarage && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                                    <CarIcon size={16} />
                                    <span>Garage</span>
                                </div>
                            )}

                            {item.hasPool && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                                    <Waves size={16} color='#ADD8E6' />
                                    <span>Pool</span>
                                </div>
                            )}

                            {item.hasGarden && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                                    <TreesIcon size={16} color='green' />
                                    <span>Garden</span>
                                </div>
                            )}

                            {item.heatingType && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                                    <HeaterIcon size={16} color='red' />
                                    <span>Heating: {item.heatingType}</span>
                                </div>
                            )}

                            {item.coolingType && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                                    <WindIcon size={16} color='blue' />
                                    <span>Cooling: {item.coolingType}</span>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {/* Add content here if needed */}
                </div>
            </div>
        </>
    )
}
