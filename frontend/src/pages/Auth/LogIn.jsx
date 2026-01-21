import React, { useState } from 'react';
import PasswordInput from '../../components/PasswordInput.jsx';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../redux/slice/userSlice.js';

/**
 * Login Component
 * Handles user authentication with email and password validation
 * Manages login state and API communication with backend
 */
const Login = () => {
  // Hook for programmatic navigation after successful login
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loading, currentUser } = useSelector((state) => state.user);

  /**
   * Handles form submission for user login
   * Validates email and password before sending API request
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password is not empty
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    // Clear previous errors
    setError(null);

    // Login API call with error handling
    try {
      dispatch(signInStart());

      // Send login credentials to backend
      const response = await axiosInstance.post('/auth/signin', {
        email,
        password,
      });

      // Handle successful login
      if (response.data) {
        dispatch(signInSuccess(response.data));
        navigate('/');
      } else {
        dispatch(signInFailure('An unexpected error occurred!'));
      }
    } catch (error) {
      // Handle login errors
      dispatch(signInFailure('An unexpected error occurred!'));

      // Display backend error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    // Main login container with background styling
    <div className="h-screen bg-[#F5EFEA] overflow-hidden relative text-clr">
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        {/* Left side: image */}
        <div className="w-2/4 h-[80vh] flex items-start bg-[url('https://images.pexels.com/photos/34720282/pexels-photo-34720282.jpeg')] bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-5xl font-semibold leading-14.5">
              A Journal for <br /> Every Cup
            </h4>

            <p className="text-[15px] leading-6 pr-7 mt-4">
              Record your coffee and tea experiences, one cup at a time.
            </p>
          </div>
        </div>

        {/* Right side: Login form section  */}
        <div className="w-2/4 h-[80vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20 ">
          <form
            className=" h-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-semibold mb-10">Login</h1>

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error && <p className="text-red-500 text-xs pb-4">{error}</p>}

            {loading ? (
              <p className="animate-pulse w-full text-center btn-primary">
                LOADING...
              </p>
            ) : (
              <button type="submit" className="btn-primary">
                LOGIN
              </button>
            )}

            <p className="text-xs text-slate-500 text-center my-4">
              Don't have an account?
            </p>

            <button
              type="submit"
              className="btn-secondary"
              onClick={() => navigate('/sign-up')}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
