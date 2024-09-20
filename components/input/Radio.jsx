import React from 'react';

const Radio = ({ name, value, id, checked, onChange }) => (
    <label
        htmlFor={id}
        className="flex items-center space-x-3 cursor-pointer hover:bg-blue-100 p-2 rounded transition duration-300 ease-in-out"
    >
        <input
            type="radio"
            name={name}
            value={value}
            id={id}
            checked={checked}
            onChange={onChange}
            className="form-radio h-5 w-5 text-blue-600 "
            aria-checked={checked}
            aria-labelledby={id}
        />
        <span className="text-gray-500 text-sm">{value}</span>
    </label>
);

export default Radio;
