import express from 'express';
import { verifyToken } from '../utils/verifyUsers.js';
import {
  addBrewLog,
  getAllBrewLogs,
  imageUpload,
  deleteImage,
  editBrewLog,
  deleteBrewLog,
  updateIsFavourite,
} from '../controllers/brewLog.controller.js';
import upload from '../multer.js';

const router = express.Router();

router.post('/upload-image', upload.single('image'), imageUpload);

router.delete('/delete-image', deleteImage);

router.post('/add', verifyToken, addBrewLog);

router.get('/get-all', verifyToken, getAllBrewLogs);

router.post('/edit-review/:id', verifyToken, editBrewLog);

router.delete('/delete-story/:id', verifyToken, deleteBrewLog);

router.put('/add-to-favourite/:id', verifyToken, updateIsFavourite);

export default router;
