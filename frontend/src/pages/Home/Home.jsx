import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import ReviewCard from '../../components/ReviewCard';
import EmptyCard from '../../components/EmptyCard';
import { IoMdAdd } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import AddEditReview from '../../components/AddEditReview';
import ViewReview from './ViewReview';

const Home = () => {
  const [allReviews, setAllReviews] = useState([]);

  // console.log(allReviews);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

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

  // delete review
  const deleteReview = async (data) => {
    const reviewId = data._id;

    try {
      const response = await axiosInstance.delete(
        '/brewlog/delete-story/' + reviewId,
      );

      if (response.data && !response.data.error) {
        toast.success('Log deleted successfully!');
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));

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

      <div className="container mx-auto py-10 px-4 md:px-8">
        <div className="flex gap-7">
          <div className="flex-1">
            {allReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      {/* Add & Edit Review Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 999,
          },
        }}
        appElement={document.getElementById('root')}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <AddEditReview
          reviewInfo={openAddEditModal.data}
          type={openAddEditModal.type}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', data: null });
          }}
          getAllBrewLogs={getAllBrewLogs}
        />
      </Modal>

      {/* View review modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 999,
          },
        }}
        appElement={document.getElementById('root')}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <ViewReview
          reviewInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => {
            deleteReview(openViewModal.data || null);
          }}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-accent text-white fixed right-10 bottom-10 shadow-lg transition-all duration-200"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <IoMdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  );
};

export default Home;
