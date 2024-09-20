"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Input/Input";
import Link from "next/link";

export default function OfferPage() {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    productid: "",
    defaultdata: "offer",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/offer/create", formData);
      fetchOffers();
      toast.success("Offer added successfully!");
      setFormData({
        type: "",
        productid: "",
        defaultdata: "offer",
      });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding offer:", error);
      toast.error("Error in adding offer");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/offer/delete/${id}`);
      fetchOffers();
      toast.success("Offer deleted successfully!");
    } catch (error) {
      console.error("Error deleting offer:", error);
      toast.error("Error deleting offer");
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="py-8 lg:px-4">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800">Manage Offers</h1>
        <button
          onClick={toggleFormVisibility}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
          {isFormVisible ? "Hide Form" : "Add New Offer"}
        </button>
      </div>

      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-6 bg-white p-8 rounded-xl shadow-lg transition-all duration-500 ease-in-out"
        >
          <div>
            <Input
              label="Offer Type"
              name="type"
              type="text"
              value={formData.type}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
            Add Offer
          </button>
        </form>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mt-8">Existing Offers</h2>
      <ul className="mt-6 space-y-4">
        {offers.map((offer) => (
          <li
            key={offer._id}
            className="p-6 border rounded-xl shadow-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <div className="text-lg">
              <strong className="text-gray-700">Type :</strong> {offer.type} <br />
              <div className="mt-2 text-gray-600">
                <strong>Project Link :</strong>
                {offer.productid ? (
                  <Link href={`/admin/page/singlepage/${offer.productid}`}className="text-blue-500 hover:underline ml-2">Avaliable
                  </Link>
                ) : (
                  <span className="text-red-500">No Offer Available</span>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDelete(offer._id)}
              className="ml-4 py-2 px-6 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md text-sm transition-all duration-300 ease-in-out"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
