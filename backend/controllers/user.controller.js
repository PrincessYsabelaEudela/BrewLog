// Import dependencies
import User from '../models/user.model.js'; // User database model
import { errorHandler } from '../utils/error.js'; // Custom error handling utility

// Get user profile controller
// Retrieves the authenticated user's information (excluding password) from database
export const getUsers = async (req, res, next) => {
  // Extract user ID from the authenticated request
  const userId = req.user.id;

  // Find user in database by ID
  const validUser = await User.findOne({ _id: userId });

  // Check if user exists, return 401 if not authorized
  if (!validUser) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  // Extract user data excluding the password field for security
  const { password: pass, ...rest } = validUser._doc;

  res.status(200).json(rest);
};

// Signout controller - handles user logout
// Clears the authentication cookie and ends user session
export const signout = async (req, res, next) => {
  try {
    // Clear the access token cookie and send success message
    res
      .clearCookie('access_token') // Remove authentication cookie from client
      .status(200)
      .json('User has been loggedout successfully!');
  } catch (error) {
    // Pass any errors to error handler middleware
    next(error);
  }
};
