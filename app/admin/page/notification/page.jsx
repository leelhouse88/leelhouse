import React from 'react';

export default function Page() {
  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
         
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Notification
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                27 Aug 2024
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                You have a new message in your inbox.
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  View
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                26 Aug 2024
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                Your profile has been updated successfully.
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  View
                </button>
              </td>
            </tr>
            {/* Add more notifications here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
