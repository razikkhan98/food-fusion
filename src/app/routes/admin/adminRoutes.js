// routes/user.routes.js
const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/admin/registerController");
const loginController = require("../../controllers/admin/loginController");

/// User Register (No Token Required)
router.post("/register", registerController.register);

// User Login (No Token Required)
router.post("/login", loginController.loginUser);

module.exports = router;
