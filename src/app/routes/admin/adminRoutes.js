const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/admin/registerController");
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/admin/floorController");
const tablesController = require("../../controllers/admin/tableContoller");
const customerController = require("../../controllers/admin/customerController");



// User Staff Register (No Token Required)
router.post("/staff/register", registerController.register);
// User Login (No Token Required)
router.post("/staff/login", loginController.loginUser);




// Create Floor (Protected Routes)
router.post("/createFloor", floorController.createFloor);
// Get All Floor (Protected Routes)
router.get("/getAllFloors", floorController.getAllFloors); 
// Get Table By Floor Id (Single Floor)  (Protected Routes)
router.get("/getFloorById/:id", floorController.getFloorById);
// Update Floor By Floor Id (Single Floor) (Protected Routes)
router.put("/updateFloorById/:id", floorController.updateFloor);
// Delete Floor By Floor Id (Single Floor) (Protected Routes)
router.delete("/deleteFloorById/:id", floorController.deleteFloor);



// Create Table (Protected Routes)
router.post("/createTable", tablesController.createTable);
// Get All Tables (Protected Routes)
router.get("/getAllTables", tablesController.getAllTables);
// Get Table By Table Id (Single Table)  (Protected Routes)
router.get("/getTableById/:id", tablesController.getTableById);
// Update Table By Table Id (Single Table) (Protected Routes)
router.put("/updateTableById/:id", tablesController.updateTable);
// Delete Table By Table Id (Single Table) (Protected Routes)
router.delete("/deleteTableById/:id", tablesController.deleteTable);



// Create Customer (Protected Routes)
router.post("/CreateCustomer", customerController.createCustomer);
// Get All Customer (Protected Routes)
router.get("/GetAllCustomers", customerController.getAllCustomers);
// Get Customer By Customer Id (Single Customer) (Protected Routes)
router.get("/getCustomerById/:id", customerController.getCustomerById);
// Update Customer By Customer Id (Single Customer) (Protected Routes)
router.put("/updateCustomerById/:id", customerController.updateCustomer);
// Delete Customer By Customer Id (Single Customer) (Protected Routes)
router.delete("/deleteCustomerById/:id", customerController.deleteCustomer);



module.exports = router;
