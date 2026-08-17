const express = require("express");
const Student = require("../models/students");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register",async(req ,res) => {
    try{
        const{
            name,
            email,
            phone,
            password,
            instrument
        }= req.body;

        const existingStudent = await Student.findOne({email});

        if (existingStudent){
            return res.status(400).json({
                message: "Student with this email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const student = new Student({
            name,
            email,
            phone,
            password: hashedPassword,
            instrument
        });

        await student.save();

        const studentData = student.toObject();
        delete studentData.password;
        res.status(201).json({
            message:"Student registeres successfully",
            student: studentData
        });

    } catch (error){
        console.error(error);

        res.status(500).json({
            message: "Failed to register student"
        });
    }
});

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
});
// Student Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            student.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const studentData = student.toObject();
        delete studentData.password;
        res.json({
            message: "Login successful",
            student: studentData
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});

// Get student by ID
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .select("-password")
            .populate("instrument");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch student"
        });
    }
});
module.exports= router;