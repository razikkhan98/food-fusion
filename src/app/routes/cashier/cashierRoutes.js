// routes/user.routes.js
const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/cashier/floorController");
const tablesController = require("../../controllers/cashier/tableController");
const customerController = require("../../controllers/cashier/customerController");


// Staff Login (No Token Required)
router.post("/staff/login", loginController.loginUser);



// Get All Floor (Protected Routes)
router.get("/getAllFloors", floorController.getFloors);
// Get Table By Floor Id (Single Floor) (Protected Routes)
router.get("/getFloorById/:id", floorController.getFloorById);



// Get All Tables (Protected Routes)
router.get("/getAllTables", tablesController.getAllTables);
// Get Table By Table Id (Single Table) (Protected Routes)
router.get("/getTableById/:id", tablesController.getTableById);




// Create Customer (Protected Routes)
router.post("/CreateCustomer", customerController.createCustomer);
// Get All Customer (Protected Routes)
router.get("/GetAllCustomers", customerController.getAllCustomers);
// Get Customer By Customer Id (Single Customer) (Protected Routes)
router.get("/getCustomerById/:id", customerController.getCustomerById);


module.exports = router;
