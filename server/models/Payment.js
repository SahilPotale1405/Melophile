const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        feeMonth: {
            type: Date,
            required: true,
        },

        paymentDate: {
            type: Date,
            default: Date.now,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "UPI", "Bank Transfer", "Other"],
            default: "Cash",
        },

        status: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Paid",
        },

        transactionId: {
            type: String,
            default: "",
            trim: true,
        },

        notes: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);