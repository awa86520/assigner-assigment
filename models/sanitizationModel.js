const mongoose = require("mongoose");

const sanitizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 18 },
});

module.exports = mongoose.model("SanitizedUser", sanitizationSchema);
