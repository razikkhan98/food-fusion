const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/admin/registerController");
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/admin/floorController");
const tablesController = require("../../controllers/admin/tableContoller");
const customerController = require("../../controllers/admin/customerController");

/** Auth Routes */

/// User Register (No Token Required)
router.post("/register", registerController.register);
// User Login (No Token Required)
router.post("/login", loginController.loginUser);

/** Auth Routes end */

/** --------------------------------------------------------------- */

/** Floor APIs */

// Create Floor
router.post("/createFloor", floorController.createFloor);
// Get All Floor
router.get("/getAllFloors", floorController.getFloors);
// Get Table By Floor Id (Single Floor)
router.get("/getFloorById/:id", floorController.getFloorById);
// Update Floor By Floor Id (Single Floor)
router.put("/updateFloorById/:id", floorController.updateFloor);
// Delete Floor By Floor Id (Single Floor)
router.delete("/deleteFloorById/:id", floorController.deleteFloor);

/** Floor APIs end*/

/** ---------------------------------------------------------------- */

/** Table APIs*/

// Create Table
router.post("/createTable", tablesController.createTable);
// Get All Tables
router.get("/getAllTables", tablesController.getAllTables);
// Get Table By Table Id (Single Table)
router.get("/getTableById/:id", tablesController.getTableById);
// Update Table By Table Id (Single Table)
router.put("/updateTableById/:id", tablesController.updateTable);
// Delete Table By Table Id (Single Table)
router.delete("/deleteTableById/:id", tablesController.deleteTable);

/** Table APIs end*/

/** ---------------------------------------------------------------- */

/** Customer APIs*/

// Create Customer
router.post("/CreateCustomer", customerController.createCustomer);
// Get All Customer
router.get("/GetAllCustomers", customerController.getAllCustomers);
// Get Customer By Customer Id (Single Customer)
router.get("/getCustomerById/:id", customerController.getCustomerById);
// Update Customer By Customer Id (Single Customer)
router.put("/updateCustomerById/:id", customerController.updateCustomer);
// Delete Customer By Customer Id (Single Customer)
router.delete("/deleteCustomerById/:id", customerController.deleteCustomer);

/** Customer APIs end*/

/** ---------------------------------------------------------------- */

module.exports = router;
