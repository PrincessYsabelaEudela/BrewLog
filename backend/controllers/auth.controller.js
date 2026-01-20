// Import dependencies
import bcryptjs from 'bcryptjs'; // For hashing and comparing passwords
import User from '../models/user.model.js'; // User database model
import { errorHandler } from '../utils/error.js'; // Custom error handling utility
import jwt from 'jsonwebtoken'; // For creating JSON Web Tokens

// Signup controller - handles user registration
// Validates input, hashes password, and creates new user in database
export const signup = async (req, res, next) => {
  // Extract user input from request body
  const { username, email, password } = req.body;

  // Validate that all required fields are provided and not empty
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    // Return error if validation fails
    return next(errorHandler(400, 'All fields are required'));
  }

  // Hash the password with bcryptjs using salt rounds of 10 for security
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create new user instance with provided credentials
  const newUser = new User({
    username,
    email,
    password: hashedPassword, // Store hashed password, never plain text
  });

  // Attempt to save the user to database
  try {
    await newUser.save();

    // Send success response
    res.json('Signup successful');
  } catch (error) {
    // Pass any errors to error handler middleware
    next(error);
  }
};

// Signin controller - handles user authentication and login
// Validates credentials, creates JWT token, and returns user data
export const signin = async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Validate that both email and password are provided and not empty
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Find user in database by email
    const validUser = await User.findOne({ email });

    // If user doesn't exist, return 404 error
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Compare provided password with hashed password stored in database
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // If password doesn't match, return 400 error
    if (!validPassword) {
      return next(errorHandler(400, 'Wrong Credentials'));
    }

    // Generate JWT token containing user ID, signed with secret key for secure client-server communication
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Extract user data excluding the password field for security
    const { password: pass, ...rest } = validUser._doc;

    // Send response with 200 status, set JWT as httpOnly cookie, and return user data
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the token
      })
      .json(rest);
  } catch (error) {
    // Pass any unexpected errors to error handler middleware
    next(error);
  }
};
