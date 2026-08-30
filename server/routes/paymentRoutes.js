const express = require("express");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const Student = require("../models/students");
const razorpay = require("../config/razorpay")

const router = express.Router();

// =========================
// GET ALL PAYMENTS
// =========================

router.get("/", async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("student", "name email")
            .sort({ paymentDate: -1 });

        res.json(payments);

    } catch (error) {
        console.error("Failed to fetch payments:", error);

        res.status(500).json({
            message: "Failed to fetch payments",
        });
    }
});


// =========================
// CREATE RAZORPAY ORDER
// =========================

router.post("/create-order", async (req, res) => {
    try {
        const { studentId, amount } = req.body;

        if (!studentId) {
            return res.status(400).json({
                message: "Student ID is required",
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Valid payment amount is required",
            });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: "INR",
            receipt: `melophile_${studentId}_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(201).json({
            message: "Payment order created successfully",
            order,
            keyId: process.env.RAZORPAY_KEY_ID,
            student: {
                _id: student._id,
                name: student.name,
                email: student.email,
            },
        });

    } catch (error) {
        console.error("Create order error:", error);

        res.status(500).json({
            message: "Failed to create payment order",
        });
    }
});

// =========================
// VERIFY RAZORPAY PAYMENT
// =========================

router.post("/verify", async (req, res) => {
    try {
        const {
            studentId,
            amount,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (
            !studentId ||
            !amount ||
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                message: "Payment verification details are incomplete",
            });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment verification failed",
            });
        }

        const existingPayment = await Payment.findOne({
            transactionId: razorpay_payment_id,
        });

        if (existingPayment) {
            return res.status(200).json({
                message: "Payment already recorded",
                payment: existingPayment,
            });
        }

        const payment = new Payment({
            student: studentId,
            amount: Number(amount),
            paymentDate: new Date(),
            paymentMethod: "UPI",
            status: "Paid",
            transactionId: razorpay_payment_id,
            notes: `Razorpay Order: ${razorpay_order_id}`,
        });

        await payment.save();

        student.fees = "Paid";
        await student.save();

        const populatedPayment = await Payment.findById(payment._id)
            .populate("student", "name email");

        res.status(201).json({
            message: "Payment verified and recorded successfully",
            payment: populatedPayment,
        });

    } catch (error) {
        console.error("Payment verification error:", error);

        res.status(500).json({
            message: "Failed to verify payment",
        });
    }
});

// =========================
// GET PAYMENTS FOR STUDENT
// =========================

router.get("/student/:studentId", async (req, res) => {
    try {
        const payments = await Payment.find({
            student: req.params.studentId,
        }).sort({ paymentDate: -1 });

        res.json(payments);

    } catch (error) {
        console.error("Failed to fetch student payments:", error);

        res.status(500).json({
            message: "Failed to fetch student payments",
        });
    }
});


// =========================
// CREATE PAYMENT
// =========================

router.post("/", async (req, res) => {
    try {
        const {
            studentId,
            amount,
            paymentDate,
            paymentMethod,
            status,
            transactionId,
            notes,
        } = req.body;

        if (!studentId) {
            return res.status(400).json({
                message: "Student ID is required",
            });
        }

        if (amount === undefined || amount === null || amount === "") {
            return res.status(400).json({
                message: "Payment amount is required",
            });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        const payment = new Payment({
            student: studentId,
            amount,
            paymentDate: paymentDate || Date.now(),
            paymentMethod: paymentMethod || "Cash",
            status: status || "Paid",
            transactionId: transactionId || "",
            notes: notes || "",
        });

        await payment.save();

        // Update student's current fee status
        student.fees = payment.status;

        await student.save();

        const populatedPayment = await Payment.findById(payment._id)
            .populate("student", "name email");

        res.status(201).json({
            message: "Payment recorded successfully",
            payment: populatedPayment,
        });

    } catch (error) {
        console.error("Failed to create payment:", error);

        res.status(500).json({
            message: "Failed to record payment",
        });
    }
});


// =========================
// DELETE PAYMENT
// =========================

router.delete("/:id", async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found",
            });
        }

        const studentId = payment.student;

        await Payment.findByIdAndDelete(req.params.id);

        // Check latest remaining payment
        const latestPayment = await Payment.findOne({
            student: studentId,
        }).sort({ paymentDate: -1 });

        const student = await Student.findById(studentId);

        if (student) {
            student.fees = latestPayment
                ? latestPayment.status
                : "Pending";

            await student.save();
        }

        res.json({
            message: "Payment deleted successfully",
        });

    } catch (error) {
        console.error("Failed to delete payment:", error);

        res.status(500).json({
            message: "Failed to delete payment",
        });
    }
});


module.exports = router;