import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineDelete, MdOutlineUpdate } from 'react-icons/md';

const ViewReview = ({ reviewInfo, onClose, onEditClick, onDeleteClick }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-secondary/30 p-2 rounded-l-lg">
            <button className="btn-small" onClick={onEditClick}>
              <MdOutlineUpdate className="text-lg" /> UPDATE REVIEW
            </button>

            <button className="btn-small btn-delete" onClick={onDeleteClick}>
              <MdOutlineDelete className="text-lg" /> DELETE REVIEW
            </button>

            <button className="cursor-pointer" onClick={onClose}>
              <IoMdClose className="text-lg text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">
            {reviewInfo && reviewInfo.title}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 mt-2">
              {reviewInfo?.tags?.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 text-sm text-accent bg-accent/20 px-3 py-1 rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <img
          src={reviewInfo && reviewInfo.imageUrl}
          alt="review image"
          className="w-full h-75 object-cover rounded-lg"
        />

        <div className="mt-4">
          <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
            {reviewInfo.review}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewReview;
