import express from 'express';
import { verifyToken } from '../utils/verifyUsers.js';
import {
  addBrewLog,
  getAllBrewLogs,
  imageUpload,
  deleteImage,
  editBrewLog,
} from '../controllers/brewLog.controller.js';
import upload from '../multer.js';

const router = express.Router();

router.post('/upload-image', upload.single('image'), imageUpload);

router.delete('/delete-image', deleteImage);

router.post('/add', verifyToken, addBrewLog);

router.get('/get-all', verifyToken, getAllBrewLogs);

router.post('/edit-review/:id', verifyToken, editBrewLog);

export default router;
