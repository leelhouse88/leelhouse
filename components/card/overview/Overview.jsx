import React from 'react'
import { PencilRuler, Ruler, ChartPie, Building, CalendarClock, IndianRupee, Box, Verified, BoxIcon, DiamondPercentIcon } from "lucide-react"
export default function Overview({ item }) {
    return (
        <>

            <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-3 p-2">


                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <PencilRuler width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Project Area</p>
                        <p className='text-zinc-600 text-md font-semibold '>{item.address.area}</p>
                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <Ruler width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Size</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.size} sq ft</p>
                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <Ruler width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Length</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.length}</p>
                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <Ruler width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Bredth</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.bredth}</p>
                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <DiamondPercentIcon width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Facing</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.facing}</p>
                    </div>
                </div>

                <div className='p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <BoxIcon width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className='text-[#005ca8] font-semibold text-[12px]'>Boundary Wall</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.boundarywall ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                <div className='p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <Verified width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className='text-[#005ca8] font-semibold text-[12px]'>Verified</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.verified ? 'Yes' : 'No'}</p>
                    </div>
                </div>


                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <Building width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Floor</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.floor}</p>
                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <CalendarClock width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Launch Date</p>
                        <p className="text-zinc-600 text-sm font-semibold ">
                            {new Date(item.dateListed).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                            })}
                        </p>

                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <IndianRupee width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Avg. Price</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.price}</p>
                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <ChartPie width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Possession Status</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.status}</p>
                    </div>
                </div>

                <div className=' p-2 lg:col-span-1 md:col-span-1 flex items-center gap-x-2 border rounded-md'>
                    <div>
                        <Box width={28} color='#0078db' />
                    </div>
                    <div>
                        <p className=' text-[#005ca8] font-semibold text-[12px]'>Configurations</p>
                        <p className='text-zinc-600 text-sm font-semibold '>{item.bedrooms} BHK {item.type}</p>
                    </div>
                </div>






            </div>

        </>
    )
}
