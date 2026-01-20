import BrewLog from '../models/brewLog.model.js';
import { errorHandler } from '../utils/error.js';

export const addBrewLog = async (req, res, next) => {
  const { title, review, tags, imageUrl } = req.body;

  const userId = req.user.id;

  // Validate that all required fields are provided
  if (!title || !review || !tags || !imageUrl) {
    return next(errorHandler(400, 'All fields are required'));
  }

  //   convert visited date from milliseconds to Date Object
  //   const parsedVisitedDate = new Date(parseInt(visitedDate))

  try {
    const brewLog = new BrewLog({
      title, // Brew name or title
      review, // User's review/description
      tags, // Tags for categorization
      userId, // Associate with the authenticated user
      imageUrl, // Image URL for the brew
      // visitedDate: parsedVisitedDate, // Optional visited date
    });

    await brewLog.save();

    res.status(201).json({
      review: brewLog,
      message: 'Your review is added successfully!',
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBrewLogs = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const brewLogs = await BrewLog.find({ userId: userId }).sort({
      isFavorite: -1,
    });

    res.status(200).json({ reviews: brewLogs });
  } catch (error) {
    next(error);
  }
};

export const getAllTravelStory = async (req, res, next) => {};

export const imageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, 'No image uploaded'));
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    res.status(201).json({ imageUrl });
  } catch (error) {
    next(error);
  }
};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const rootDir = path.join(__dirname, '..');
