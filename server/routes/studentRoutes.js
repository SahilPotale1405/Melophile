const express = require("express");
const Student = require("../models/students");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            instrument
        } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const existingStudent = await Student.findOne({ email: normalizedEmail });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student with this email already exists"
            });
        }

        const student = new Student({
            name,
            email:normalizedEmail,
            phone,
            instrument,
            status: "Pending"
        });

        await student.save();

        res.status(201).json({
            message: "Registration submitted successfully. Please wait for admin approval.",
            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                instrument: student.instrument,
                status: student.status,
                fees: student.fees,
                sessionsLeft: student.sessionsLeft
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to register student"
        });
    }
});

// Approve student
router.put("/approve/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        if (student.status !== "Pending") {
            return res.status(400).json({
                message: "Student is already approved"
            });
        }

        const temporaryPassword =
            "Mlp@" + Math.floor(1000 + Math.random() * 9000);

        const hashedPassword = await bcrypt.hash(
            temporaryPassword,
            10
        );

        student.password = hashedPassword;
        student.status = "Active";
        student.mustChangePassword = true;

        await student.save();

        res.json({
            message: "Student approved successfully",
            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
                status: student.status,
                mustChangePassword: student.mustChangePassword
            },
            temporaryPassword
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to approve student"
        });
    }
});

// Update student
router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            instrument,
            fees,
            status,
            sessionsLeft
        } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const existingStudent = await Student.findOne({
            email: normalizedEmail,
            _id: { $ne: req.params.id }
        });

        if (existingStudent) {
            return res.status(400).json({
                message: "Another student is already using this email"
            });
        }

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        student.name = name;
        student.email = normalizedEmail;
        student.phone = phone;
        student.instrument = instrument;
        student.fees = fees;
        student.status = status;
        student.sessionsLeft = sessionsLeft;

        await student.save();

        res.json({
            message: "Student updated successfully",
            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                instrument: student.instrument,
                fees: student.fees,
                status: student.status,
                sessionsLeft: student.sessionsLeft,
                mustChangePassword: student.mustChangePassword
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update student"
        });
    }
});

// Deactivate student
router.put("/deactivate/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        student.status = "Inactive";

        await student.save();

        res.json({
            message: "Student deactivated successfully",
            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
                fees: student.fees,
                status: student.status,
                sessionsLeft: student.sessionsLeft
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to deactivate student"
        });
    }
});

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find().select("-password");

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

        const normalizedEmail = email.trim().toLowerCase();

        console.log("LOGIN EMAIL:", normalizedEmail);

       const student = await Student.findOne({
    email: normalizedEmail
});

console.log("LOGIN EMAIL:", normalizedEmail);
console.log("STUDENT:", student);

        if (!student) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            student.password
        );

        console.log("PASSWORD MATCH:", isPasswordCorrect);

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
        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});
// Change student password
router.put("/change-password/:id", async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                message: "New password is required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        student.password = hashedPassword;
        student.mustChangePassword = false;

        await student.save();

        res.json({
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to change password"
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

router.put("/reset-test-password/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const hashedPassword = await bcrypt.hash("TestPassword123", 10);

        student.password = hashedPassword;
        student.mustChangePassword = false;

        await student.save();

        res.json({
            message: "Test password reset successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to reset password"
        });
    }
});

// TEMPORARY: Reset test student password
router.put("/reset-test-password/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        const hashedPassword = await bcrypt.hash(
            "TestPassword123",
            10
        );

        student.password = hashedPassword;
        student.mustChangePassword = false;

        await student.save();

        res.json({
            message: "Test password reset successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to reset password",
        });
    }
});
module.exports= router;