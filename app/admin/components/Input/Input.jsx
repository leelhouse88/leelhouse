import React from 'react'

export default function Input({ label, name, ...props }) {
    return (
        <>
            <div>

                <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
                <input
                    type="text"
                    id={name}
                    name={name}
                    {...props}
                   className="w-full h-8 px-3 py-2 border-b border-gray-300 focus:border-b focus:border-blue-900 bg-white focus:bg-transparent focus:rounded-none text-gray-700  focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                    required
                />
            </div>


        </>
    )
}
