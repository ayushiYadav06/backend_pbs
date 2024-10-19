import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    questionPaper: { type: String } // Cloudinary 
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
