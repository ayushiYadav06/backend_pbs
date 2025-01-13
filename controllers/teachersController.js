import Teacher from '../models/TeacherSchema.js';

// Register a new teacher
export const registerTeacher = async (req, res) => {
    try {
        const {
            facultyName,
            designation,
            dateOfBirth,
            dateOfJoining,
            gender,
            mobileNumber,
            email
        } = req.body;

        // Check if email already exists
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const newTeacher = new Teacher({
            facultyName,
            designation,
            dateOfBirth,
            dateOfJoining,
            gender,
            mobileNumber,
            email
        });

        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Error registering teacher', error: error.message });
    }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers', error });
    }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Error updating teacher', error });
    }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher', error });
    }
};
