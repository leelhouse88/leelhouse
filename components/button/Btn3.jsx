import React from 'react'
export default function Btn3({ title,icon }) {
    return (
        <div>
            <button className=' bg-[#0078db]/80 text-white  px-4 py-2 text-lg rounded-md bg- hover:bg-[#0078db] duration-150  flex items-center gap-x-2'>{icon} {title}</button>
        </div>
    )
}
