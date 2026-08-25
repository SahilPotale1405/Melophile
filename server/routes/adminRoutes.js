const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const router = express.Router();

// Admin Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const admin = await Admin.findOne({
            username: username.trim()
        });

        if (!admin) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        res.json({
            message: "Admin login successful",
            admin: {
                _id: admin._id,
                username: admin.username
            }
        });

    } catch (error) {
        console.error("ADMIN LOGIN ERROR:", error);

        res.status(500).json({
            message: "Admin login failed"
        });
    }
});

module.exports = router;