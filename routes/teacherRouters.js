
import express from 'express';
import {
  registerTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();

// Protecting routes to only allow admin
router.route('/').post(protect, admin, registerTeacher).get(protect, admin, getTeachers);
router.route('/:id').get(protect, admin, getTeacherById).put(protect, admin, updateTeacher).delete(protect, admin, deleteTeacher);

export default router;
