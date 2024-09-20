import React from 'react'
import Image from 'next/image'
export default function Gallery({ project }) {
    return (
        <>

            <div className="grid grid-rows-6 grid-cols-3 gap-4">
                <div className="row-span-6 col-span-2">
                    <Image alt="" src={project[0]} className="object-cover h-full w-full" width={820} height={550} />
                </div>

                <div className="row-span-3 col-span-1">
                    <Image alt="" src={project[0]} className="object-cover h-full w-full" width={820} height={550} />
                </div>
                <div className="row-span-3 col-span-1">
                    <Image alt="" src={project[0]} className="object-cover h-full w-full" width={820} height={550} />
                </div>
            </div>


        </>
    )
}
