import express from 'express';
import {
  registerAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmission,
  deleteAdmission
} from '../controllers/addmissionControllers.js';

const router = express.Router();

// Register a new admission
router.post('/', registerAdmission);

// Get all admissions
router.get('/', getAdmissions);

// Get admission by ID
router.get('/:id', getAdmissionById);

// Update an admission
router.put('/:id', updateAdmission);

// Delete an admission
router.delete('/:id', deleteAdmission);

export default router;
