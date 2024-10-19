
import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, unique: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    cityOrVillage: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodGroup: { type: String },
    department: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;