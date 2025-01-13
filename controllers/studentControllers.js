
import  Student  from '../models/StudentSchema.js';

export const registerStudent = async (req, res) => {
    try {
        // Check if the document and image files exist
        if (!req.file) {
            return res.status(400).json({ message: 'Document are required' });
        }

        // Extract fields from request body
        const {
            timestamp,
            session,
            name,
            gender,
            category,
            fatherName,
            motherName,
            mobileNo,
            email,
            adharCardNo,
            abcId,
            bloodGroup,
            enrollmentNo,
            mjc01,
            mic01,
            mdc01,
            sec01,
            vac01,
            aec01,
            mjc02,
            mic02,
            mdc02,
            sec02,
            vac02,
            aec02,
        } = req.body;
      
        console.log(req.body.document)
        // Create a new student object
        const newStudent = new Student({
            timestamp: timestamp || Date.now(), // Use current timestamp if not provided
            session,
            name,
            gender,
            category,
            fatherName,
            motherName,
            mobileNo,
            email,
            adharCardNo,
            abcId,
            bloodGroup,
            enrollmentNo,
            mjc01,
            mic01,
            mdc01,
            sec01,
            vac01,
            aec01,
            mjc02,
            mic02,
            mdc02,
            sec02,
            vac02,
            aec02,
            document: req.file.path, // File path for the document
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
