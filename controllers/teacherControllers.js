
import Teacher  from '../models/TeacherSchema.js';


export const registerTeacher = async (req, res) => {
    try {
        const {
            name,
            guardianName,
            email,
            mobileNo,
            address,
            pin,
            cityOrVillage,
            state,
            gender,
            bloodGroup,
            department,
            joiningDate
        } = req.body;

        const newTeacher = new Teacher({
            name,
            guardianName,
            email,
            mobileNo,
            address,
            pin,
            cityOrVillage,
            state,
            gender,
            bloodGroup,
            department,
            joiningDate,
        });

        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (error) {
        res.status(500).json({ message: 'Error registering teacher', error });
    }
};


export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers', error });
    }
};
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