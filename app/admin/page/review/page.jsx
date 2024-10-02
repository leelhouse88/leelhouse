"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {Trash} from "lucide-react"

export default function Page() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // current page
  const pageSize = 5; // number of reviews per page

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/Review/fetchall/review");
        const sortedReviews = response.data.fetch.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // Sort by latest first
        setReviews(sortedReviews);
      } catch (err) {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Review/delete/${id}`);
      toast.success("Review Deleted");
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const totalPages = Math.ceil(reviews.length / pageSize); // Calculate total pages

  // Get reviews for the current page
  const currentReviews = reviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
        Customer Reviews
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {review.name}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Email: </span>
                {review.email}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold">Review: </span>
                {review.review}
              </p>
              <p className="text-gray-500 text-sm italic">{review.defaultdata}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600 transition duration-300"
              >
                <Trash />
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No reviews found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full shadow-md transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full shadow-md transition-all duration-300 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
