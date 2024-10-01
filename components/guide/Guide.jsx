import React from 'react';

export default function Guide() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mx-auto ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
        Why Choose Leelhouse?
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        Your trusted partner in buying and selling properties of all types.
      </p>

      <ul className="space-y-6">
        {[
          {
            title: "Diverse Property Options",
            description: "We specialize in buying and selling commercial properties, houses, villas, and more.",
          },
          {
            title: "Thorough Verification",
            description: "We ensure all properties undergo rigorous verification to safeguard your investment.",
          },
          {
            title: "Expert Guidance",
            description: "Our experienced agents provide you with personalized support throughout the process.",
          },
          {
            title: "Identity Assurance",
            description: "We prioritize identity verification to maintain trust and transparency in every transaction.",
          },
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-start bg-gray-100 rounded-lg p-4 shadow-md "
          >
            <span className="text-green-500 text-3xl mr-3">&#10003;</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
