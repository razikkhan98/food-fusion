// routes/user.routes.js
const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/cashier/floorController");
const tablesController = require("../../controllers/cashier/tableController");
const customerController = require("../../controllers/cashier/customerController");
const menuController = require("../../controllers/cashier/menuController");
// const previousOrderController = require("../../controllers/cashier/previousOrderController");
const orderController = require("../../controllers/cashier/orderController");
const billController = require("../../controllers/cashier/billController");


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
// Get All Menu
router.get("/getAllMenu",menuController.getAllMenu);
// Route to search for a menu item by name or code
// router.get('/menu/search', menuController.searchMenu);


// Order
router.post("/orderSendtoKitchen", orderController.userOrder) 

// All Previous Order in this customer 
// router.post("/previous/order", orderController.createOrder);
// Get All Prevoius Order
// router.get("/getAllOrder", orderController.getAllOrder);


// Billing 
router.post("/bill", billController.billingOrder);
// Get All Bills
router.get("/getAllBilling",billController.getAllBill);


module.exports = router;
