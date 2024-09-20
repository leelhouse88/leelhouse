import React from 'react';
import Image from 'next/image';
const ServicePopup = ({ service, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
                <p className="mb-4">{service.description}</p>
                <Image src={service.imageUrl} alt='' width={100} height={100} className=' mb-5'/>
                <button
                    onClick={() => {
                        onDelete(service._id); // Use _id for deletion
                        onClose();
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2"
                >
                    Delete
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ServicePopup;
