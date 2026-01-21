import React from 'react';
import { FaHeart } from 'react-icons/fa';

const ReviewCard = ({
  imageUrl,
  title,
  review,
  tags,
  isFavourite,
  onEdit,
  onClick,
  onFavouriteClick,
}) => {
  console.log(isFavourite);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-100 object-cover rounded-lg"
        onClick={onClick}
      />

      <button
        className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`icon-btn ${
            isFavourite ? 'text-accent' : 'text-white'
          } hover:text-accent cursor-pointer`}
        />
      </button>

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-[16px] font-medium">{title}</h6>
          </div>
        </div>

        <p className="text-sm text-slate-600 mt-2">{review?.slice(0, 60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] rounded py-1">
          {tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-accent/30 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
