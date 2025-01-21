// routes/user.routes.js
const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/admin/registerController");
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/admin/floorController");

/// User Register (No Token Required)
router.post("/register", registerController.register);

// User Login (No Token Required)
router.post("/login", loginController.loginUser);

/** Floor APIs */

// Create Floor
router.post("/createFloor", floorController.createFloor);

// get All Floor
router.get("/getAllFloor", floorController.getFloors);

/** Floor APIs */

module.exports = router;
