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
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out duration-300 relative cursor-pointer hover:scale-105">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg"
        onClick={onClick}
      />

      <button
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/40 hover:bg-white/60 rounded-lg border border-white/30 absolute top-3 right-3 md:top-4 md:right-4 transition-colors"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`text-lg md:text-xl transition-colors ${
            isFavourite ? 'text-accent' : 'text-white'
          } hover:text-accent`}
        />
      </button>

      <div className="p-3 md:p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm md:text-base font-medium line-clamp-2">
              {title}
            </h6>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 mt-2 line-clamp-2">
          {review?.slice(0, 60)}
        </p>

        <div className="inline-flex items-center gap-2 text-xs md:text-sm rounded py-1 flex-wrap">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent/30 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
