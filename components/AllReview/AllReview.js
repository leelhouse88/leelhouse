import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { User, Calendar } from 'lucide-react'; // Assuming you're using lucide-react for icons

export default function AllReview({ projectid }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Array of colors to rotate through for the circles
    const colors = ['bg-indigo-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500'];

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/Review/fetch-byproject/${projectid}`);
                setReviews(response.data.fetch);
            } catch (err) {
                setError('Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [projectid]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1200, min: 1024 },
            items: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="p-6 ">
            {loading && <p className="text-gray-500">Loading reviews...</p>}
            {reviews.length === 0 && !loading && (
                <p className="text-gray-500">No reviews available.</p>
            )}
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {reviews.map((review, index) => (
                    <div
                        key={review._id}
                        className="flex flex-col h-64 mx-2 p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                    >
                        <div className="flex items-center mb-4">
                            {/* Avatar with initials */}
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${colors[index % colors.length]}`}
                            >
                                {review.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                                <h3 className="font-semibold line-clamp-1 text-lg capitalize text-gray-800">
                                    {review.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-1 flex items-center">
                                    <User className="w-4 h-4 mr-1" /> {review.email}
                                </p>
                            </div>
                        </div>
                        <p className="flex-grow mt-2 text-sm text-gray-700 italic line-clamp-4">
                            &ldquo;{review.review}&ldquo;
                        </p>
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
