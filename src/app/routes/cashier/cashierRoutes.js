// routes/user.routes.js
const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/cashier/floorController");
const tablesController = require("../../controllers/cashier/tableController");
const customerController = require("../../controllers/cashier/customerController");

/** Auth Routes */

// User Login (No Token Required)
router.post("/login", loginController.loginUser);

/** Auth Routes end */
/** --------------------------------------------------------------- */

/** Floor APIs */

// Get All Floor
router.get("/getAllFloors", floorController.getFloors);
// Get Table By Floor Id (Single Floor)
router.get("/getFloorById/:id", floorController.getFloorById);

/** Floor APIs end*/

/** ---------------------------------------------------------------- */

/** Table APIs*/

// Get All Tables
router.get("/getAllTables", tablesController.getAllTables);
// Get Table By Table Id (Single Table)
router.get("/getTableById/:id", tablesController.getTableById);

/** Table APIs end*/

/** ---------------------------------------------------------------- */

/** Customer APIs*/

// Create Customer
router.post("/CreateCustomer", customerController.createCustomer);
// Get All Customer
router.get("/GetAllCustomers", customerController.getAllCustomers);
// Get Customer By Customer Id (Single Customer)
router.get("/getCustomerById/:id", customerController.getCustomerById);

/** Customer APIs end*/

/** ---------------------------------------------------------------- */

module.exports = router;
