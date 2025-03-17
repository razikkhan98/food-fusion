// routes/user.routes.js
const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/cashier/floorController");
const tablesController = require("../../controllers/cashier/tableController");
const customerController = require("../../controllers/cashier/customerController");
const menuController = require("../../controllers/cashier/menuController");

// Token for routes
const { validateToken } = require("../../middlewares/validateTokenHandler");


// Staff Login (No Token Required)
router.post("/staff/login", loginController.loginUser);



// Get All Floor (Protected Routes)
router.get("/getAllFloors",validateToken, floorController.getFloors);
// Get Table By Floor Id (Single Floor) (Protected Routes)
router.get("/getFloorById/:id",validateToken, floorController.getFloorById);



// Get All Tables (Protected Routes)
router.get("/getAllTables",validateToken, tablesController.getAllTables);
// Get Table By Table Id (Single Table) (Protected Routes)
router.get("/getTableById/:id",validateToken, tablesController.getTableById);




// Create Customer (Protected Routes)
router.post("/createCustomer",validateToken, customerController.createCustomer);
// Get All Customer (Protected Routes)
router.get("/GetAllCustomers",validateToken, customerController.getAllCustomers);
// Get Customer By Customer Id (Single Customer) (Protected Routes)
router.get("/getCustomerById/:id",validateToken, customerController.getCustomerById);


// Add Menu 
router.post("/createMenu",menuController.addMenu);
// Route to search for a menu item by name or code
// router.get('/menu/search', menuController.searchMenu);





module.exports = router;
