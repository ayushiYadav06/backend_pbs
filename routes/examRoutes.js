import express from 'express';
import { createExam, getExams } from '../controllers/examControllers.js';

const router = express.Router();

router.post('/exams', createExam);
router.get('/exams', getExams);

export default router;
