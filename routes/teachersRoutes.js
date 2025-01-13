import express from 'express';
import {
  registerTeacher,
  getAllTeachers,
} from '../controllers/teachersController.js'; // Added `.js` extension

const router = express.Router();

// Routes for teacher operations
router.post('/register', registerTeacher);  // Route to register a new teacher
router.get('/all', getAllTeachers);        // Route to get all teachers

export default router;
