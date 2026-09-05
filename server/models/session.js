const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        checkIn: {
            type: Date,
            required: true,
        },

        checkOut: {
            type: Date,
            default: null,
        },

        durationMinutes: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["Active", "Completed"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Session", sessionSchema);