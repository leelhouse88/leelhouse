"use client";
import React, { useState, useEffect } from "react";
import AllProjectCard from "@/components/card/allprojectpage/Card";
import { Search } from "lucide-react";
import LatestCard from "@/components/card/latest/Card";
import BestDealCard from "@/components/card/bestdeal/Card";
import Link from "next/link";
import Loading from "@/components/Loader/Loading";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Collectionproject({ params }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [decodedTitle, decodedLocation] = decodeURIComponent(params.title).split(",");
    const [title, setTitle] = useState(decodedTitle || "All Category");
    const [location, setLocation] = useState(decodedLocation || "Jaipur");
    const [city, setCity] = useState([]);
    const [rawItems, setRawItems] = useState([]);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("Relevance");
    const [selectedTitle, setSelectedTitle] = useState(title);
    const [titles, setTitles] = useState(["All Category"]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/project/fetchall/project");
                const fetchedItems = response.data.fetch;
                setRawItems(fetchedItems);

                const uniqueTitles = ["All Category", ...new Set(fetchedItems.map((item) => item.title))];
                setTitles(uniqueTitles);

                // Filter items based on title and location
                const filteredItems = fetchedItems.filter(
                    (item) =>
                        (item.title === title || title === "All Category") &&
                        item.location === location
                );
                setItems(filteredItems);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [title, location]);


    useEffect(() => {
        const fetchCity = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/project/findallcity/project");
                setCity(response.data.cities)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCity();
    }, []);




    useEffect(() => {
        let sortedItems = [...rawItems];

        if (sortOrder === "Price (Inc)") {
            sortedItems.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "Price (Dec)") {
            sortedItems.sort((a, b) => b.price - a.price);
        }

        if (selectedTitle !== "All Category") {
            sortedItems = sortedItems.filter((item) => item.title === selectedTitle && item.location === location);
        } else {
            sortedItems = sortedItems.filter((item) => item.location === location);
        }

        // Filter by search query
        if (searchQuery) {
            sortedItems = sortedItems.filter((item) =>
                Object.values(item.address).some((value) =>
                    value && value.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        setItems(sortedItems);
        setCurrentPage(1);
    }, [sortOrder, selectedTitle, location, searchQuery, rawItems]);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleTitleChange = (e) => {
        setSelectedTitle(e.target.value);
        setCurrentPage(1);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        setCurrentPage(1);
    };

    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await axios.get('/api/metadata/fetchall/metadata');
                setMetadata(response.data.fetch);
            } catch (err) {
                console.error('Failed to fetch metadata:', err);
            }
        };

        fetchMetadata();
    }, []);


    const filteredMetadata = metadata.filter(item => item.page === 'Collection');


    return (
        <>
            <Navbar />
            {filteredMetadata.map((item) => (
                <>
                    <title key={item._id}>{item.title}</title>
                    <meta name="description" content={item.description} />
                </>
            ))}
            <div className="h-16 bg-2"></div>
            <header className="bg-2 py-2 w-full top-0 left-0 z-50">
                <div className="mx-auto h-full flex items-center px-4 gap-x-3">
                    <div className="order-3 lg:order-2 text-white border-l ps-3 text-sm">
                        Buy In
                        <select
                            value={location}
                            onChange={handleLocationChange}
                            className="bg-transparent text-white rounded focus:border-none focus:outline-none"
                        >
                            {city.map((item) => (

                                <option key={item._id} value={item} className="text-black">
                                    {item}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className="order-2 lg:order-2 relative flex-1">
                        <input
                            type="search"
                            placeholder="Search by locality, area, or landmark"
                            className="w-full font-light border border-gray-300 rounded pl-10 pr-4 py-1 md:py-2 focus:outline-none"
                            value={searchQuery}
                            onChange={handleSearchChange} // Bind the handler here
                        />
                        <Search
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        />
                    </div>

                </div>
            </header>

            <main className="bg-[#f4f4f4] pt-4 left-0 right-0">
                <div className="container mx-auto px-2 ">
                    <div className="grid lg:grid-cols-7 gap-4">
                        <div className="col-span-5 p-0 md:p-4">
                            <div className="bg-gray-100 rounded-t-md pb-2 px-4">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div className="mb-0 md:mb-2">
                                        <p className="text-gray-600 text-2 text-xs md:text-sm">
                                            Showing {indexOfFirstItem + 1} -{" "}
                                            {Math.min(indexOfLastItem, items.length)} of {items.length}
                                        </p>
                                        <p className="text-sm md:text-lg font-semibold">
                                            {title} Project in {location}
                                        </p>
                                    </div>
                                    <div className="flex justify-between md:justify-end w-full md:w-fit flex-row md:items-center gap-y-2 md:gap-x-4">
                                        <div className="text-xs flex items-center gap-x-2">
                                            <p className="hidden md:block">Sort by:</p>
                                            <select
                                                value={sortOrder}
                                                onChange={handleSortChange}
                                                className="px-2 py-1 text-xs md:text-sm shadow rounded focus:border-none focus:outline-none"
                                            >
                                                <option value="Relevance">Relevance</option>
                                                <option value="Price (Inc)">Price (Inc)</option>
                                                <option value="Price (Dec)">Price (Dec)</option>
                                            </select>
                                        </div>
                                        <div className="text-xs flex items-center gap-x-2">
                                            <p className="hidden md:block">Filter by Category:</p>
                                            <select
                                                value={selectedTitle}
                                                onChange={handleTitleChange}
                                                className="px-2 py-1 text-xs md:text-sm shadow rounded focus:border-none focus:outline-none"
                                            >
                                                {titles.map((title) => (
                                                    <option key={title._id} value={title}>
                                                        {title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex gap-1 md:gap-2 mt-2 md:mt-0">
                                            <button
                                                className="bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize"
                                                onClick={handlePrevPage}
                                                disabled={currentPage === 1}
                                            >
                                                Prev
                                            </button>
                                            <button className="bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize">
                                                {currentPage}
                                            </button>
                                            <button
                                                className="bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize"
                                                onClick={handleNextPage}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-auto bg-white h-[100vh] pb-56 p-2">
                                {loading ? (
                                    <Loading />
                                ) : currentItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <svg
                                            className="w-12 h-12 mb-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m9-9a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="text-sm">No results found.</p>
                                        <p className="text-sm">Try changing your filter settings.</p>
                                    </div>
                                ) : (
                                    currentItems.map((item) => (
                                        <Link key={item._id} href={`/properties/${item.slug}`}>
                                            <AllProjectCard item={item} />
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="col-span-2 p-4 hidden lg:block">
                            <div className="border bg-white">
                                <LatestCard />
                            </div>
                            <div className="border bg-white mt-4">
                                <BestDealCard />
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </>
    );
}
