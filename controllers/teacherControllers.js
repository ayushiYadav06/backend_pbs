import asyncHandler from 'express-async-handler';
import Teacher from '../models/TeacherSchema.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

// @desc    Register a new teacher
// @route   POST /api/teachers
// @access  Admin
const registerTeacher = asyncHandler(async (req, res) => {
    const { name, guardianName, email, mobileNo, address, pin, cityOrVillage, state, gender, bloodGroup, department, joiningDate } = req.body;

    // Validate required fields
    if (!name || !guardianName || !email || !mobileNo || !address || !pin || !cityOrVillage || !state || !gender || !department || !joiningDate) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if the email already exists
    const emailExists = await Teacher.findOne({ email });
    if (emailExists) {
        res.status(400);
        throw new Error('Email already exists');
    }

    // Create a new teacher entry
    const teacher = await Teacher.create({
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

    // Send a welcome email
    if (teacher) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our Institution',
            text: `Dear ${name},\n\nYou have been registered successfully as a teacher.\n\nBest Regards,\nYour Institution`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            status: true,
            message: 'Teacher registered successfully',
            data: teacher,
        });
    } else {
        res.status(400);
        throw new Error('Teacher registration failed');
    }
});

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Admin
const getTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find({});
    res.json({ status: true, data: teachers });
});

// @desc    Get teacher by ID
// @route   GET /api/teachers/:id
// @access  Admin
const getTeacherById = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);

    if (teacher) {
        res.json({ status: true, data: teacher });
    } else {
        res.status(404);
        throw new Error('Teacher not found');
    }
});

// @desc    Update a teacher
// @route   PUT /api/teachers/:id
// @access  Admin
const updateTeacher = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);

    if (teacher) {
        teacher.name = req.body.name || teacher.name;
        teacher.guardianName = req.body.guardianName || teacher.guardianName;
        teacher.email = req.body.email || teacher.email;
        teacher.mobileNo = req.body.mobileNo || teacher.mobileNo;
        teacher.address = req.body.address || teacher.address;
        teacher.pin = req.body.pin || teacher.pin;
        teacher.cityOrVillage = req.body.cityOrVillage || teacher.cityOrVillage;
        teacher.state = req.body.state || teacher.state;
        teacher.gender = req.body.gender || teacher.gender;
        teacher.bloodGroup = req.body.bloodGroup || teacher.bloodGroup;
        teacher.department = req.body.department || teacher.department;
        teacher.joiningDate = req.body.joiningDate || teacher.joiningDate;

        const updatedTeacher = await teacher.save();

        res.json({
            status: true,
            message: 'Teacher updated successfully',
            data: updatedTeacher,
        });
    } else {
        res.status(404);
        throw new Error('Teacher not found');
    }
});

// @desc    Delete a teacher
// @route   DELETE /api/teachers/:id
// @access  Admin
const deleteTeacher = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);

    if (teacher) {
        await teacher.remove();
        res.json({ status: true, message: 'Teacher removed' });
    } else {
        res.status(404);
        throw new Error('Teacher not found');
    }
});

export { registerTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher };
