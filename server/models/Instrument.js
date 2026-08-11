const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Instrument", instrumentSchema);