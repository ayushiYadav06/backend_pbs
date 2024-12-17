
import  Student  from '../models/StudentSchema.js';

export const registerStudent = async (req, res) => {
    try {
        // Check if the document file exists
        if (!req.file) {
            return res.status(400).json({ message: 'Document is required' });
        }

        // Extract fields from request body
        const {
            name,
            fatherName,
            email,
            mobileNo,
            rollNo,
            enrollmentNo,
            courseTaken,
            branchName,
            admissionYear,
            section,
            adharCardNo,
            status,
        } = req.body;

        // Create a new student object
        const newStudent = new Student({
            name,
            fatherName,
            email,
            mobileNo,
            rollNo,
            enrollmentNo,
            courseTaken,
            branchName,
            admissionYear,
            section,
            adharCardNo,
            status,
            document: req.file.path, // File path for document
        });

        // Save the student in the database
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error: error.message });
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
