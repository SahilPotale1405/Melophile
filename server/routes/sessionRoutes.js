const express = require("express");
const Session = require("../models/session");
const Student = require("../models/students");

const router = express.Router();


// Mark student present
router.post("/mark-present", async (req, res) => {
    try {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({
                message: "Student ID is required",
            });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        if (student.sessionsLeft <= 0) {
            return res.status(400).json({
                message: "Student has no sessions remaining",
            });
        }



        // Check whether the student was already marked present today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingSession = await Session.findOne({
            student: studentId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        if (existingSession) {
            return res.status(400).json({
                message: "Student is already marked present today",
            });
        }

        // Create session
        const session = new Session({
            student: studentId,
            type: "Practice",
            status: "Present",
        });

        await session.save();

        // Reduce remaining sessions
        student.sessionsLeft -= 1;

        await student.save();

        res.status(201).json({
            message: "Student marked present successfully",
            session,
            sessionsLeft: student.sessionsLeft,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to mark student present",
        });
    }
});

// Get all sessions
router.get("/", async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate("student", "name email")
            .sort({ date: -1 });

        res.json(sessions);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch sessions",
        });
    }
});

// Get sessions for a specific student
router.get("/student/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const sessions = await Session.find({
            student: studentId,
        })
            .sort({ date: -1 })
            .limit(5);

        res.json(sessions);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch student sessions",
        });
    }
});
module.exports = router;