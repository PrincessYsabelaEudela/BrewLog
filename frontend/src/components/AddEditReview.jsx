import React, { useState } from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { MdOutlineDeleteOutline, MdOutlineUpdate } from 'react-icons/md';
import ImageSelector from './ImageSelector';
import axiosInstance from '../utils/axiosInstance';
import TagInput from './TagInput';
import { toast } from 'react-toastify';
import uploadImage from '../utils/uploadImage';

const AddEditReview = ({ reviewInfo, type, onClose, getAllBrewLogs }) => {
  const [title, setTitle] = useState(reviewInfo?.title || '');
  const [reviewImg, setReviewImg] = useState(reviewInfo?.imageUrl || null);
  const [review, setReview] = useState(reviewInfo?.review || '');
  const [tags, setTags] = useState(reviewInfo?.tags || []);

  const [error, setError] = useState('');

  const addNewReview = async () => {
    try {
      let imageUrl = '';

      // Upload image if present
      if (reviewImg) {
        const imgUploadRes = await uploadImage(reviewImg);

        imageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post('/brewlog/add', {
        title,
        review,
        imageUrl: imageUrl || '',
        tags,
      });

      if (response.data && response.data.review) {
        toast.success('Review added successfully!');

        getAllBrewLogs();

        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateReview = async () => {
    const reviewId = reviewInfo._id;

    try {
      let imageUrl = '';

      let postData = {
        title,
        review,
        imageUrl: reviewInfo.imageUrl || '',
        tags,
      };

      if (typeof reviewImg === 'object') {
        // Upload new image
        const imageUploadRes = await uploadImage(reviewImg);

        imageUrl = imageUploadRes.imageUrl || '';

        postData = {
          ...postData,
          imageUrl: imageUrl,
        };
      }

      const response = await axiosInstance.post(
        '/brewlog/edit-review/' + reviewId,
        postData,
      );

      if (response.data && response.data.review) {
        toast.success('Review updated successfully!');

        getAllBrewLogs();

        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong! Please try again.');
      }
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError('Please enter the title');
      return;
    }

    if (!review) {
      setError('Please enter the review');
      return;
    }

    setError('');

    if (type === 'edit') {
      updateReview();
    } else {
      addNewReview();
    }
  };

  const handleDeleteReviewImage = async () => {
    // Only delete from server if it's an existing review with an image
    if (reviewInfo?.imageUrl) {
      const deleteImageResponse = await axiosInstance.delete(
        '/brewlog/delete-image',
        {
          params: {
            imageUrl: reviewInfo.imageUrl,
          },
        },
      );

      if (deleteImageResponse.data) {
        const reviewId = reviewInfo._id;

        const postData = {
          title,
          review,
          tags,
          imageUrl: '',
        };

        // updating review

        const response = await axiosInstance.post(
          '/brewlog/edit-review/' + reviewId,
          postData,
        );

        if (response.data) {
          toast.success('Review image deleted successfully');

          setReviewImg(null);

          getAllBrewLogs();
        }
      }
    } else {
      // If it's a new review, just clear the image from state
      setReviewImg(null);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === 'add' ? 'Add Review' : 'Update Review'}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === 'add' ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <IoMdAdd className="text-lg" /> ADD REVIEW
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdOutlineUpdate className="text-lg" /> UPDATE REVIEW
                </button>

                <button className="btn-small btn-delete">
                  <MdOutlineDeleteOutline className="text-lg" /> DELETE REVIEW
                </button>
              </>
            )}

            <button onClick={onClose}>
              <IoMdClose className="text-xl text-slate-400" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-1 flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>

          <input
            type="text"
            className="text-2xl text-slate-900 outline-none"
            placeholder="Drink name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <ImageSelector
            image={reviewImg}
            setImage={setReviewImg}
            handleDeleteImage={handleDeleteReviewImage}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">REVIEW</label>

            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded-sm"
              placeholder="Your Review"
              rows={10}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <div className="pt-3">
            <label className="input-label">TAGS</label>

            <TagInput tags={tags} setTags={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditReview;
