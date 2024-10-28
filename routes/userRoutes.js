import express from 'express';
import { loginUser,confirmAdmission, registerTeacher, registerAdmin } from '../controllers/userControllers.js';
import { protect, admin, teacher, student } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route (login)
router.post('/login', loginUser);

// Protected routes (accessible only if logged in)
router.get('/adminRoute', protect, admin, (req, res) => {
  res.send('Admin content');
});

router.get('/teacherRoute', protect, teacher, (req, res) => {
  res.send('Teacher content');
});

router.get('/studentRoute', protect, student, (req, res) => {
  res.send('Student content');
});
router.post('/registerStudent', protect, admin, confirmAdmission);
router.post('/registerTeacher', protect, admin, registerTeacher);

// Only admin can register other admins
router.post('/registerAdmin',  registerAdmin);
export default router;
