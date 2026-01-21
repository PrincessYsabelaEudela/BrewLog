import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="input-box flex items-center">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Enter Your Password'}
        className="w-full text-sm bg-transparent mr-3 rounded-sm outline-hidden"
        type={isShowPassword ? 'text' : 'password'}
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-accent cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-500 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;
