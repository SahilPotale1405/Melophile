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
        feeAmount:{
            type: Number,
            default:0,
            min:0,
        },

        status: {
            type: String,
            enum: ["Pending", "Active", "Renew Soon", "Inactive"],
            default: "Pending",
        },

        planTotalMinutes: {
            type: Number,
            default: 1800, // 30 hours
            min: 0,
        },

        planUsedMinutes: {
            type: Number,
            default: 0,
            min: 0,
        },

        planStartDate: {
            type: Date,
            default: null,
        },

        planStatus: {
            type: String,
            enum: ["Active", "Expired"],
            default: "Active",
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

module.exports =
    mongoose.models.Student ||
    mongoose.model("Student", studentSchema);