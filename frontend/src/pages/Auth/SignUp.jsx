import React, { useState } from 'react';
import PasswordInput from '../../components/PasswordInput.jsx';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Login Component
 * Handles user authentication with email and password validation
 * Manages login state and API communication with backend
 */
const SignUp = () => {
  // Hook for programmatic navigation after successful login
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables for form inputs and error handling
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loading, currentUser } = useSelector((state) => state.user);

  /**
   * Handles form submission for user login
   * Validates email and password before sending API request
   */
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter your name.');
      return;
    }

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

    // Sign up API call with error handling
    try {
      // Send sign up credentials to backend
      const response = await axiosInstance.post('/auth/signup', {
        username: name,
        email,
        password,
      });

      // Handle successful sign up
      if (response.data) {
        navigate('/login');
      }
    } catch (error) {
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
    // Main signup container with background styling
    <div className="min-h-screen bg-[#F5EFEA] overflow-hidden relative">
      <div className="container h-auto md:h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-20 mx-auto py-10 md:py-0">
        {/* Left side: Signup form section  */}
        <div className="w-full md:w-2/4 h-auto md:h-[80vh] bg-white rounded-lg md:rounded-l-lg relative p-8 md:p-16 shadow-lg">
          <form
            className="h-full flex flex-col justify-center items-center"
            onSubmit={handleSignUp}
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-10">
              Create Your Account
            </h1>

            <input
              type="text"
              placeholder="Username"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
                CREATE ACCOUNT
              </button>
            )}

            <p className="text-xs text-slate-500 text-center my-4">
              Already have an account?
            </p>

            <button
              type="submit"
              className="btn-secondary"
              onClick={() => navigate('/login')}
            >
              LOGIN
            </button>
          </form>
        </div>

        {/* Right side: image */}
        <div className="w-full md:w-2/4 h-64 md:h-[80vh] flex items-start bg-[url('https://images.pexels.com/photos/34720282/pexels-photo-34720282.jpeg')] bg-cover bg-center rounded-lg p-6 md:p-10">
          <div>
            <h4 className="text-3xl md:text-5xl font-semibold leading-tight">
              A Journal for <br /> Every Cup
            </h4>

            <p className="text-sm md:text-[15px] leading-6 pr-7 mt-4">
              Record your coffee and tea experiences, one cup at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
