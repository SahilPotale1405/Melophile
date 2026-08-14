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

        res.status(201).json({
            message:"Student registeres successfully",
            student
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

module.exports= router;