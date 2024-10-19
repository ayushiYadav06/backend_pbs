
import  Student  from '../models/StudentSchema.js';


export const registerStudent = async (req, res) => {
    try {
        const {
            name,
            fatherName,
            motherName,
            email,
            mobileNo,
            address,
            cityVillage,
            state,
            country,
            gender,
            bloodGroup,
            rollNo,
            courseTaken,
            branchName,
            admissionYear
        } = req.body;

        const newStudent = new Student({
            name,
            fatherName,
            motherName,
            email,
            mobileNo,
            address,
            cityVillage,
            state,
            country,
            gender,
            bloodGroup,
            rollNo,
            courseTaken,
            branchName,
            admissionYear,
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
};


export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};


// Update
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};
