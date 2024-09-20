import React from 'react'
import { LocateIcon,  } from "lucide-react"
import SmallCard from "@/components/card/smallcard/Card"
import Overview from '@/components/card/overview/Overview'
export default function Details() {
    return (
        <>
            <div className="grid lg:grid-cols-7">

                <div className="lg:col-span-5 ">
                    <div className=' bg-white p-3 shadow'>
                        <div className=' flex gap-x-4 items-center'>
                            <div><LocateIcon width={40} color='#0078db' /></div>
                            <div>
                                <p className=' text-zinc-400 font-semibold'>Property Location</p>
                                <p className=' font-medium'>Nirman Nagar, Gopalpura Bypass Road, Brijalpura, NH - 8 Jaipur, Jaipur</p>

                            </div>
                        </div>
                        <div className=' bg-zinc-100 p-3 rounded-md shadow mt-3'>
                            <p className=' font-semibold underline underline-offset-2 text-2'>Around This Project</p>

                            <div className=' mt-4 mb-2 relative h-16'>
                                <SmallCard />
                            </div>



                        </div>
                    </div>



                    <div className=' bg-white shadow mt-4'>
                        <div className=' flex p-3 gap-x-4 items-center border-b'>
                            <p className=' text-2 text-xl font-semibold'>Parth Crown Overview</p>
                        </div>

                       <Overview/>

                    </div>
                </div>
                <div className="lg:col-span-2"></div>
            </div>


        </>
    )
}
