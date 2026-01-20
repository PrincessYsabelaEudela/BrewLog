import express from 'express';
import { verifyToken } from '../utils/verifyUsers.js';
import {
  addBrewLog,
  getAllBrewLogs,
} from '../controllers/brewLog.controller.js';

const router = express.Router();

router.post('/add', verifyToken, addBrewLog);

router.get('/get-all', verifyToken, getAllBrewLogs);

export default router;
