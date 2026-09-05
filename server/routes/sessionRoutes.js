const express = require("express");
const Session = require("../models/session");
const Student = require("../models/students");

const router = express.Router();

// =========================
// CHECK IN STUDENT
// =========================

router.post("/check-in", async (req, res) => {
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

        // Calculate remaining plan time
        const remainingMinutes =
            student.planTotalMinutes - student.planUsedMinutes;

        // Check whether plan has expired
        // Check whether plan has expired
            if (
                remainingMinutes <= 0 ||
                student.planStatus === "Expired"
            ) {
                student.planStatus = "Expired";
                await student.save();

                return res.status(400).json({
                    message: "Student plan has expired. Please renew the plan.",
                });
            }

        // Check whether student is already checked in
        const activeSession = await Session.findOne({
            student: studentId,
            status: "Active",
        });

        if (activeSession) {
            return res.status(400).json({
                message: "Student is already checked in.",
            });
        }

        // Create active session
        const session = new Session({
            student: studentId,
            checkIn: new Date(),
            status: "Active",
        });

        await session.save();

        res.status(201).json({
            message: "Student checked in successfully.",
            session,
            remainingMinutes,
        });
    } catch (error) {
        console.error("Check-in error:", error);

        res.status(500).json({
            message: "Failed to check in student.",
        });
    }
});


// =========================
// CHECK OUT STUDENT
// =========================

router.post("/check-out", async (req, res) => {
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

        // Find active session
        const session = await Session.findOne({
            student: studentId,
            status: "Active",
        });

        if (!session) {
            return res.status(400).json({
                message: "Student is not currently checked in.",
            });
        }

        // Set checkout time
        const checkOutTime = new Date();

        session.checkOut = checkOutTime;

        // Calculate duration in minutes
        const durationMinutes = Math.max(
            0,
            Math.floor(
                (checkOutTime.getTime() - session.checkIn.getTime()) /
                    (1000 * 60)
            )
        );

        session.durationMinutes = durationMinutes;
        session.status = "Completed";

        await session.save();

        // Add used time to student's plan
        student.planUsedMinutes += durationMinutes;

        // Calculate remaining time
        const remainingMinutes =
            student.planTotalMinutes - student.planUsedMinutes;

        // Expire plan if no time remains
        if (remainingMinutes <= 0) {
            student.planStatus = "Expired";
        }

        await student.save();

        res.json({
            message: "Student checked out successfully.",
            session,
            usedMinutes: student.planUsedMinutes,
            remainingMinutes: Math.max(0, remainingMinutes),
            planStatus: student.planStatus,
        });
    } catch (error) {
        console.error("Check-out error:", error);

        res.status(500).json({
            message: "Failed to check out student.",
        });
    }
});


// =========================
// GET ALL SESSIONS
// =========================

router.get("/", async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate("student", "name email")
            .sort({ checkIn: -1 });

        res.json(sessions);
    } catch (error) {
        console.error("Failed to fetch sessions:", error);

        res.status(500).json({
            message: "Failed to fetch sessions",
        });
    }
});


// =========================
// GET SESSIONS FOR STUDENT
// =========================

router.get("/student/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;

        const sessions = await Session.find({
            student: studentId,
        })
            .sort({ checkIn: -1 })
            .limit(20);

        res.json(sessions);
    } catch (error) {
        console.error("Failed to fetch student sessions:", error);

        res.status(500).json({
            message: "Failed to fetch student sessions",
        });
    }
});

// =========================
// RENEW STUDENT PLAN
// =========================

router.post("/renew-plan", async (req, res) => {
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

        // Start a fresh 30-hour plan
        student.planTotalMinutes = 1800;
        student.planUsedMinutes = 0;
        student.planStartDate = new Date();
        student.planStatus = "Active";

        await student.save();

        res.json({
            message: "Student plan renewed successfully.",
            planTotalMinutes: student.planTotalMinutes,
            planUsedMinutes: student.planUsedMinutes,
            remainingMinutes: student.planTotalMinutes,
            planStartDate: student.planStartDate,
            planStatus: student.planStatus,
        });
    } catch (error) {
        console.error("Plan renewal error:", error);

        res.status(500).json({
            message: "Failed to renew student plan.",
        });
    }
});

module.exports = router;