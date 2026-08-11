const express = require("express");
const Instrument = require("../models/Instrument");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const instruments = await Instrument.find({ active: true });
        res.json(instruments);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch instruments"
        });
    }
});

module.exports = router;