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
        },

        phone: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
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
            enum: ["Active", "Renew Soon", "Inactive"],
            default: "Active",
        },

        sessionsLeft: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Student", studentSchema);