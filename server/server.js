const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const instrumentRoutes = require("./routes/instrumentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.status(200).send("MELOPHILE BACKEND IS WORKING");
});

app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Render API is working",
        timestamp: new Date().toISOString()
    });
});

app.use("/api/instruments", instrumentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/sessions", sessionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});