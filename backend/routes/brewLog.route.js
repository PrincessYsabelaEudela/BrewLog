import express from 'express';
import { verifyToken } from '../utils/verifyUsers.js';
import { addBrewLog } from '../controllers/brewLog.controller.js';

const router = express.Router();

router.post('/add', verifyToken, addBrewLog);

export default router;
