const express = require("express");
const { login, getUserProfile, getAdminDashboard } = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/user/profile", authenticateUser, getUserProfile);
router.get("/admin/dashboard", authenticateUser, authorizeRole("admin"), getAdminDashboard);

module.exports = router;
