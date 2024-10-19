
import express from 'express';
import { createNotification, getAllNotifications, updateNotification } from '../controllers/notificationControllers.js';

const router = express.Router();

router.post('/add', createNotification);


router.get('/all', getAllNotifications);


router.put('/update/:id', updateNotification);

export default router;