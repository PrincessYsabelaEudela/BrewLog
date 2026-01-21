import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {
  const [allReviews, setAllReviews] = useState([]);

  console.log(allReviews);

  // Get all travel stories
  const getAllBrewLogs = async () => {
    try {
      const response = await axiosInstance.get('/brewlog/get-all');

      if (response.data && response.data.reviews) {
        setAllReviews(response.data.reviews);
      }
    } catch (error) {
      console.log('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    getAllBrewLogs();

    return () => {};
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1"> </div>

          <div className="w-[320px]"> </div>
        </div>
      </div>
    </>
  );
};

export default Home;
