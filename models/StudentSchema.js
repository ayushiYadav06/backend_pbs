import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    enrollmentNo: {
        type: String,
        required: true,
        unique: true
    },
    courseTaken: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    admissionYear: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    adharCardNo: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
    },
    document: {
        type: String, 
        required: true
    },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
