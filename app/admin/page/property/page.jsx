"use client";
import React, { useState, useEffect } from 'react';
import AllProjectCard from "@/components/card/admin-allprojectpage/Card";
import axios from 'axios';
import Loading from '@/components/Loader/Loading';
import { Search } from 'lucide-react';
export default function Property() {
  const [rawItems, setRawItems] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('Relevance');
  const [selectedTitle, setSelectedTitle] = useState('All Category');
  const [titles, setTitles] = useState(['All Category']);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(true); // Add loading state
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetch
      try {
        const response = await axios.get('/api/project/fetchall/project');
        const fetchedItems = response.data.fetch;
        setRawItems(fetchedItems);

        const uniqueTitles = ['All Category', ...new Set(fetchedItems.map(item => item.title))];
        setTitles(uniqueTitles);

        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredItems = [...rawItems];

    // Filtering by search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.address.houseNumber?.toLowerCase().includes(lowercasedQuery) ||
        item.address.colony?.toLowerCase().includes(lowercasedQuery) ||
        item.address.area?.toLowerCase().includes(lowercasedQuery) ||
        item.address.landmark?.toLowerCase().includes(lowercasedQuery) ||
        item.address.city?.toLowerCase().includes(lowercasedQuery) ||
        item.location.toLowerCase().includes(lowercasedQuery) ||
        item.address.pincode?.toLowerCase().includes(lowercasedQuery) ||
        item.address.state?.toLowerCase().includes(lowercasedQuery) ||
        item.address.country?.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Sorting items
    if (sortOrder === 'Price (Inc)') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'Price (Dec)') {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    // Filtering by title
    if (selectedTitle !== 'All Category') {
      filteredItems = filteredItems.filter(item => item.title === selectedTitle);
    }

    setItems(filteredItems);
    setCurrentPage(1);
  }, [sortOrder, selectedTitle, searchQuery, rawItems]);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className='text-xs flex top-3 items-center gap-x-2 fixed left-1/2 transform -translate-x-1/2 z-50'>
        <form className="hidden md:flex items-center bg-[#ffffff38] rounded-md overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Address..."
            className="bg-transparent placeholder:text-white text-white px-4 py-2 w-72 text-sm focus:outline-none"
          />
          <button type="submit" className="flex items-center justify-center px-2">
            <Search color="#fff" size={20} />
          </button>
        </form>
      </div>


      <main className='bg-[#f4f4f4]'>
        <div className="container mx-auto px-2 my-2">
          <div className="gap-4">
            <div className="p-0">

              <div className='bg-gray-100 rounded-t-md pb-2 px-4'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                  <div className='mb-0 md:mb-2'>
                    <p className='text-gray-600 text-2 text-xs md:text-sm'>
                      Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, items.length)} of {items.length}
                    </p>
                  </div>
                  <div className='flex justify-between md:justify-end w-full md:w-fit flex-row md:items-center gap-y-2 md:gap-x-4'>
                    <div className='text-xs flex items-center gap-x-2'>
                      <p className='hidden md:block'>Sort by:</p>
                      <select
                        value={sortOrder}
                        onChange={handleSortChange}
                        className='px-2 py-1 text-xs md:text-sm shadow rounded focus:border-none focus:outline-none'
                      >
                        <option value="Relevance">Relevance</option>
                        <option value="Price (Inc)">Price (Inc)</option>
                        <option value="Price (Dec)">Price (Dec)</option>
                      </select>
                    </div>
                    <div className='text-xs flex items-center gap-x-2'>
                      <p className='hidden md:block'>Filter by Category:</p>
                      <select
                        value={selectedTitle}
                        onChange={handleTitleChange}
                        className='px-2 py-1 text-xs md:text-sm shadow rounded focus:border-none focus:outline-none'
                      >
                        {titles.map(title => (
                          <option key={title} value={title}>{title}</option>
                        ))}
                      </select>
                    </div>
                    <div className='flex gap-1 md:gap-2 mt-2 md:mt-0'>
                      <button
                        className='bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize'
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      <button
                        className='bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize'
                      >
                        {currentPage}
                      </button>
                      <button
                        className='bg-[#0078db]/50 hover:bg-[#0078db] text-white rounded-md px-2 py-1 text-xs md:text-sm capitalize'
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='overflow-auto bg-white h-[100vh] pb-56 p-2'>
                {loading ? (
                  <Loading />
                ) : currentItems.length === 0 ? (
                  <div className='flex flex-col items-center justify-center text-gray-500'>
                    <svg className='w-12 h-12 mb-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 17h5l-1.403-1.403M9 17H4l1.403-1.403M12 7v6m0 4h.01' />
                    </svg>
                    <p className='text-lg font-semibold'>No data available</p>
                    <p className='text-sm text-gray-400 mt-2'>Please check back later or adjust your filters.</p>
                  </div>
                ) : (
                  currentItems.map((item) => (
                    <AllProjectCard key={item._id} item={item} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
