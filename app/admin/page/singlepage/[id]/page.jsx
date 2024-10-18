"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loader/Loading";
import Imagegallery from "@/components/gallery/Imagegallery";
import Details from "@/components/details/Details";
import { Edit, Ticket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export default function SinglePage({ params }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState(""); // To store the admin's name

  const router = useRouter();
  const id = params.id;

  // Fetch users and check for matching admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/getdata/admin');
        const fetchedUsers = response.data.fetch;

        setUsers(fetchedUsers);

        // Find the user with the matching _id
        if (project && project.adminid) {
          const matchingUser = fetchedUsers.find(user => user._id === project.adminid);
          if (matchingUser) {
            setAdminName(matchingUser.name); // Set the admin's name if matched
          }
        }
      } catch (err) {
        setError('Error fetching user data');
      }
    };

    fetchUsers();
  }, [project]); // Re-run when project is set

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get("/api/offer/getdata/offer");
      setOffers(response.data.fetch);
    } catch (error) {
      console.error("Error fetching offers:", error);
      toast.error("Error fetching offers. Please try again later.");
    }
  };

  const handleAddOffer = async () => {
    if (!project._id) {
      toast.error("Project ID is missing. Please select a project.");
      return;
    }

    try {
      await axios.patch("/api/offer/update", {
        id: selectedOffer,
        productid: project._id,
      });
      toast.success("Offer added successfully!");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding offer:", error);
      toast.error("Failed to add offer. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/project/fetch-single/${id}`);
        setProject(response.data.project);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch project data");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      try {
        await axios.delete(`/api/project/delete/${id}`);
        alert("Project deleted successfully");
        router.push("/admin/page/property");
      } catch (error) {
        alert("Failed to delete project");
      }
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Link href={`/admin/page/allimages/${project._id}`}>
          <button className="bg-2 text-white rounded-md px-2 py-1 gap-x-2 flex">
            <Edit size={20} /> Edit Details
          </button>
        </Link>
        <button onClick={handleOpenPopup} className="bg-2 text-white rounded-md px-2 py-1 gap-x-2 flex">
          <Ticket size={20} /> Add to offer
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white rounded-md px-2 py-1 gap-x-2 flex"
        >
          <Edit size={20} /> DELETE
        </button>
      </div>

      <Toaster />

      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm transition-all duration-300'>
          <div className='bg-white p-8 rounded-lg w-full max-w-lg mx-auto relative shadow-lg transform transition-transform duration-300 scale-95'>
            <button
              onClick={handleClosePopup}
              className='absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold transition-colors duration-300'
            >
              &times;
            </button>
            <h2 className='text-xl font-semibold text-center mb-4 text-gray-700'>Add to Offer</h2>
            <select
              id="offerSelect"
              className="block w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              onChange={(e) => setSelectedOffer(e.target.value)}
              required
            >
              <option value="">Select Offer Type</option>
              {offers.map((item) => (
                <option key={item.type} className="text-black" value={item._id}>
                  {item.type}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddOffer}
              className='w-full mt-6 bg-2 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md'
            >
              Add Offer
            </button>
          </div>
        </div>
      )}

      {/* Display the admin name here */}
    
      <div className="mt-5 container mx-auto lg:w-[90%] p-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-zinc-900 mb-2 flex justify-between">
        {project.propertyname}
        <span className="text-xl">
            Uploaded by: <span className="font-semibold">{adminName ? adminName : "Admin not found"}</span>
        </span>
    </h1>
    
    <h2 className="text-base text-gray-500 mb-4">
        {project.address.houseNumber}, {project.address.colony}, {project.address.area}, {project.address.city}
    </h2>

    <h3 className="text-3xl font-semibold text-zinc-900 mt-3 mb-2">
        ₹ {project.price.toLocaleString()}
    </h3>

    <p className="text-lg">
        Status: <span className={`font-semibold ${project.status === "Available" ? "text-green-500" : "text-red-500"}`}>
            {project.status}
        </span>
    </p>

    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        {project.percentage ? (
            <>
                <p className="text-xl font-sans font-bold text-gray-700">Broker</p>
                <p className="text-lg text-gray-600">{project.name}</p>
                <p className="text-lg text-gray-600">{project.percentage}%</p>
            </>
        ) : (
          <>
          <p className="text-xl font-bold text-gray-700">Onwer</p>
          <p className="text-lg text-gray-600">{project.name}</p>
        
          </>
        )}
    </div>
</div>


      <div className="bg-zinc-100 py-6 grid lg:grid-cols-4">


        <div className="  container lg:col-span-3 mx-auto lg:w-[90%]">
          <div className="bg-gray-100 shadow-lg">
            <div className="flex flex-wrap justify-evenly mb-4">
              <div className="text-center p-2">
                <p className="font-semibold text-xs md:text-md lg:text-lg text-gray-700">
                  {project.bedrooms ? `${project.bedrooms} BHK ` : ''}
                  {project.type}
                </p>
                <p className="text-gray-500 text-xs font-semibold">Configurations</p>
              </div>

              <div className="text-center p-2">
                <p className="font-semibold text-xs md:text-md lg:text-lg text-gray-700">
                  <span>{new Date(project.dateListed).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
                </p>
                <p className="text-gray-500 text-xs font-semibold">Possession Starts</p>
              </div>

              <div className="text-center p-2">
                <p className="font-semibold text-xs md:text-md lg:text-lg text-gray-700">₹ {project.price}</p>
                <p className="text-gray-500 text-xs font-semibold">Avg. Price</p>
              </div>
              <div className="text-center p-2">
                <p className="font-semibold text-xs md:text-md lg:text-lg text-gray-700">{project.address.area}</p>
                <p className="text-gray-500 text-xs font-semibold">Area</p>
              </div>
            </div>
          </div>
          <Details item={project} />
        </div>
        <div className="   lg:col-span-1">
          <h2 className="font-semibold text-2xl underline underline-offset-4 my-2">Feature Images</h2>
          <div className="">
            <Imagegallery item={project.featureImage} />
          </div>
          <h2 className="font-semibold text-2xl underline underline-offset-4 mt-4 mb-2">Images</h2>
          <div className="overflow-scroll">
            <Imagegallery item={project.images} />
          </div>
        </div>
      </div>
    </>
  );
}