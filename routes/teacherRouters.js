
import express from 'express';
import { registerTeacher, getAllTeachers, updateTeacher } from '../controllers/teacherControllers.js';

const router = express.Router();


router.post('/register', registerTeacher);


router.get('/all', getAllTeachers);


router.put('/update/:id', updateTeacher);

export default router;
