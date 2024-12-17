import express from 'express';
import { registerStudent, getAllStudents, updateStudent } from '../controllers/studentControllers.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/documents/'); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Routes

// Register a student with file upload
router.post('/register', upload.single('document'), registerStudent);

// Fetch all students
router.get('/all', getAllStudents);

// Update student details
router.put('/update/:id', updateStudent);

export default router;
