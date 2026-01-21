import React from 'react';

const EmptyCard = ({ imgSrc, message, setOpenAddEditModal }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-16 mx-auto p-6 md:p-8 bg-secondary/20 rounded-lg shadow-md border border-secondary max-w-xs md:max-w-sm">
      <div className="bg-white p-4 rounded-full shadow">
        <img
          src={imgSrc}
          alt="empty state"
          className="w-24 md:w-32 h-24 md:h-32 object-contain"
        />
      </div>

      <p className="text-sm md:text-base font-semibold text-(--text-clr) text-center mt-4 md:mt-6">
        {message || 'No reviews yet. Create your first one!'}
      </p>

      <button
        className="mt-4 px-5 py-2 text-white text-xs md:text-sm font-medium bg-primary hover:bg-accent rounded-full shadow-md transition-all duration-200"
        onClick={() => {
          setOpenAddEditModal &&
            setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        Create New
      </button>
    </div>
  );
};

export default EmptyCard;
