"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loader/Loading";
import { Toaster, toast } from "react-hot-toast";

export default function Page() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null); // Track the currently open dropdown
  const [editItem, setEditItem] = useState(null); // Track the item being edited
  const [formValues, setFormValues] = useState({});
  const itemsPerPage = 2;

  const useremail = session?.user?.email;

  // Fetch user data
  useEffect(() => {
    if (useremail) {
      axios
        .get(`/api/admin/find-admin-byemail/${useremail}`)
        .then((response) => {
          setUserData(response.data._id);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [useremail]);

  // Fetch wishlist items for the user
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/api/service/find-byuserid/${userData}`);
        // Sort wishlist items by date to show latest first
        const sortedWishlist = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setWishlist(sortedWishlist);
      } catch (err) {
        setError("Data Not Available");
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchWishlist();
    }
  }, [userData]);

  // Fetch project details for each wishlist item
  useEffect(() => {
    const fetchProjectDetails = async (userid) => {
      try {
        const response = await axios.get(`/api/service/find-projectbyid/${userid}`);
        setProjects((prevProjects) => ({
          ...prevProjects,
          [userid]: response.data,
        }));
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };

    wishlist.forEach((item) => {
      if (!projects[item.userid]) {
        fetchProjectDetails(item.userid);
      }
    });
  }, [wishlist,projects]);

  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  const paginatedWishlist = wishlist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDropdown = (userid) => {
    setOpenDropdown(openDropdown === userid ? null : userid);
    setEditItem(null); // Close edit mode when toggling dropdown
  };

  const handleEdit = (item) => {
    setEditItem(item._id);
    setFormValues({
      name: item.name,
      servicetype: item.servicetype,
      mobile: item.mobile,
      city: item.city,
      address: item.address,
      description: item.description,
      date: item.date,
      time: item.time,
      status: item.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = async (userid) => {
    try {
      const response = await axios.patch(`/api/service/update`, {
        id: userid,
        ...formValues,
      });

      if (response.data.success) {
        toast.success("Service updated successfully!");
        setWishlist((prevWishlist) =>
          prevWishlist.map((item) =>
            item._id === userid ? { ...item, ...formValues } : item
          )
        );
        setEditItem(null); // Exit edit mode
      } else {
        toast.error(response.data.message || "Failed to update service.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Error updating service.");
    }
  };

  const statusColor = {
    Completed: "bg-green-500",
    "In Progress": "bg-blue-500",
    Scheduled: "bg-yellow-500",
    Pending: "bg-gray-500",
    Cancelled: "bg-red-500",
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Toaster />
      <div className="gap-4 p-4">
        {paginatedWishlist.map((item) => (
          <div key={item.userid} className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between justify-end gap-2">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.servicetype}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => toggleDropdown(item._id)}
                  className="px-4 py-2 bg-2 text-white rounded-lg"
                >
                  {openDropdown === item._id ? "Hide Details" : "Show Details"}
                </button>
              </div>
            </div>
            {openDropdown === item._id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col space-y-2">
                  {editItem === item._id ? (
                    <>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Name:</span>
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleInputChange}
                          className="text-sm p-2 rounded w-2/3"
                        />
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Mobile:</span>
                        <input
                          type="text"
                          name="mobile"
                          value={formValues.mobile}
                          onChange={handleInputChange}
                          className="text-sm p-2 rounded w-2/3"
                        />
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">City:</span>
                        <input
                          type="text"
                          name="city"
                          value={formValues.city}
                          onChange={handleInputChange}
                          className="text-sm p-2 rounded w-2/3"
                        />
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Address:</span>
                        <input
                          type="text"
                          name="address"
                          value={formValues.address}
                          onChange={handleInputChange}
                          className="text-sm p-2 rounded w-2/3"
                        />
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Description:</span>
                        <input
                          type="text"
                          name="description"
                          value={formValues.description}
                          onChange={handleInputChange}
                          className="text-sm p-2 rounded w-2/3"
                        />
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Date:</span>
                        <input
                          type="date"
                          name="date"
                          value={formValues.date}
                          onChange={handleInputChange}
                          className="text-sm p-2 rounded w-2/3"
                        />
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Time:</span>
                        <input
                          type="time"
                          name="time"
                          value={formValues.time}
                          onChange={handleInputChange}
                          className="text-sm p-2 rounded w-2/3"
                        />
                      </div>
               
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <>
                    <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Name:</span>
                        <span className="text-sm w-2/3">{item.name}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Mobile:</span>
                        <span className="text-sm w-2/3">{item.mobile}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">City:</span>
                        <span className="text-sm w-2/3">{item.city}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Address:</span>
                        <span className="text-sm w-2/3">{item.address}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Description:</span>
                        <span className="text-sm w-2/3">{item.description}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Date:</span>
                        <span className="text-sm w-2/3">{item.date}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Time:</span>
                        <span className="text-sm w-2/3">{item.time}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded p-2">
                        <span className="font-semibold text-sm w-1/3">Status:</span>
                        <span className={`text-sm px-4 rounded-md ${statusColor[item.status]}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              
              </div>
            )}
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200 disabled:text-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
