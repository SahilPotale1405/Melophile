const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
            required: true,
        },

        type: {
            type: String,
            default: "Practice",
        },

        status: {
            type: String,
            default: "Present",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Session", sessionSchema);