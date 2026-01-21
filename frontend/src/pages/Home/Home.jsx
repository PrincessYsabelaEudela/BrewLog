import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import ReviewCard from '../../components/ReviewCard';
import EmptyCard from '../../components/EmptyCard';

const Home = () => {
  const [allReviews, setAllReviews] = useState([]);

  console.log(allReviews);

  // Get all reviews
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

  // Handle Edit review
  const handleEdit = async (data) => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data: data });
  };

  const handleViewReview = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  const addToFavourite = async (reviewData) => {
    const reviewId = reviewData._id;

    try {
      // Optimistically update local state immediately for instant UI feedback
      setAllReviews(
        allReviews.map((review) =>
          review._id === reviewId
            ? { ...review, isFavorite: !review.isFavorite }
            : review,
        ),
      );

      const response = await axiosInstance.put(
        '/brewlog/add-to-favourite/' + reviewId,
        {
          isFavorite: !reviewData.isFavorite,
        },
      );

      if (response.data && response.data.review) {
        toast.success('Review updated successfully!');
        getAllBrewLogs();
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
          <div className="flex-1">
            {allReviews.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {allReviews.map((item) => {
                  return (
                    <ReviewCard
                      key={item._id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      review={item.review}
                      tags={item.tags}
                      isFavourite={item.isFavorite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewReview(item)}
                      onFavouriteClick={() => addToFavourite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyCard
                imgSrc={
                  'https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600'
                }
                // message={getEmptyCardMessage(filterType)}
                // setOpenAddEditModal={() =>
                //   setOpenAddEditModal({
                //     isShown: true,
                //     type: 'add',
                //     data: null,
                //   })
                // }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
