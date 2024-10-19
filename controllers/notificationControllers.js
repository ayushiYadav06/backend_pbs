
import  Notification  from '../models/NotificationSchema.js';


export const createNotification = async (req, res) => {
    try {
        const { title, subject, description } = req.body;

        const newNotification = new Notification({
            title,
            subject,
            description,
        });

        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedNotification = await Notification.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};