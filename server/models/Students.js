const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: false,
        },

        instrument: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Instrument",
            required: true,
        },

        fees: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Pending",
        },

        status: {
            type: String,
            enum: ["Pending", "Active", "Renew Soon", "Inactive"],
            default: "Pending",
        },

        sessionsLeft: {
            type: Number,
            default: 0,
        },

        mustChangePassword: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Student", studentSchema);