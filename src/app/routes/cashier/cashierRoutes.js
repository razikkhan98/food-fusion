// routes/user.routes.js
const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/admin/loginController");

// User Login (No Token Required)
router.post("/login", loginController.loginUser);

module.exports = router;
