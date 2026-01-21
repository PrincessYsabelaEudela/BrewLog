import axios from 'axios';

// Base URL for backend API endpoints
const BASE_URL = 'http://localhost:3000/api';

/**
 * Configured axios instance with preset settings
 * Eliminates need to repeat the same configuration in every API call
 */
const axiosInstance = axios.create({
  // Sets base URL so only endpoint paths need to be specified (e.g., '/auth/signin', http://localhost:3000/api/auth/signin)
  baseURL: BASE_URL,

  // Allows sending cookies with requests for maintaining user sessions
  withCredentials: true,

  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export configured instance for use throughout the application
export default axiosInstance;
