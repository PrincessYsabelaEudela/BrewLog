import express from 'express';
import { verifyToken } from '../utils/verifyUsers.js';
import {
  addBrewLog,
  getAllBrewLogs,
  imageUpload,
  deleteImage,
} from '../controllers/brewLog.controller.js';
import upload from '../multer.js';

const router = express.Router();

router.post('/image-upload', upload.single('image'), imageUpload);

router.delete('/delete-image', deleteImage);

router.post('/add', verifyToken, addBrewLog);

router.get('/get-all', verifyToken, getAllBrewLogs);

export default router;
