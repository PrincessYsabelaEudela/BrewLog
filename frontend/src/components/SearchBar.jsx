import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-60 md:w-80 flex items-center px-4 bg-secondary/20 rounded-md border border-secondary hover:border-accent transition-colors">
      <input
        type="text"
        placeholder="Search reviews..."
        className="w-full text-xs bg-transparent py-2.75 outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <IoMdClose
          className="text-lg text-slate-500 cursor-pointer hover:text-accent mr-3 transition-colors"
          onClick={onClearSearch}
        />
      )}

      <FaSearch
        className="text-slate-400 cursor-pointer hover:text-accent transition-colors"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
