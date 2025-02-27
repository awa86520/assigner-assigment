const express = require("express");
const { createSanitizedUser } = require("../controllers/sanitizationController");
const { validateSanitizedUser } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/createUser", validateSanitizedUser, createSanitizedUser);

module.exports = router;
