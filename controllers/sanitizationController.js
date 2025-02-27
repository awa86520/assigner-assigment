const SanitizedUser = require("../models/sanitizationModel");

exports.createSanitizedUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const sanitizedUser = new SanitizedUser({ name, email, age });

        await sanitizedUser.save();
        res.status(201).json({ message: "User data sanitized and stored successfully", sanitizedUser });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
