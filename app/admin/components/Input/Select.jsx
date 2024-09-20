import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Select({ label, name, ...props }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get('/api/category/fetchall/category')
            .then(response => {
                setOptions(response.data.fetch);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching options:", error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div>
                <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>

                <select
                    id={name}
                    name={name}
                    {...props}
                    className="w-full h-8 px-3 border-b focus:border-blue-900 bg-white focus:bg-white focus:rounded-none text-gray-700 focus:ring-0 focus:outline-none transition duration-150 ease-in-out sm:text-sm"
                    required
                >
                    <option value="" disabled>{loading ? "Loading..." : "Please select an option"}</option>
                    {!loading && options.map(option => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
