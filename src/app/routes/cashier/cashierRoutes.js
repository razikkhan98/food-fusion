// routes/user.routes.js
const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/admin/loginController");
const floorController = require("../../controllers/cashier/floorController");
const tablesController = require("../../controllers/cashier/tableController");
const customerController = require("../../controllers/cashier/customerController");
const menuController = require("../../controllers/cashier/menuController");
const previousOrderController = require("../../controllers/cashier/previousOrderController");
const orderController = require("../../controllers/cashier/orderController");
const billController = require("../../controllers/cashier/billController");
const paymentController = require("../../controllers/cashier/paymentController");
const registerController = require("../../controllers/admin/registerController");
const scheduleOrderController = require("../../controllers/cashier/scheduleOrderController");

// Token for routes
const { validateToken } = require("../../middlewares/validateTokenHandler");
const {protectedRoute} = require("../../middlewares/validatesession");
const scheduleOrderModel = require("../../models/scheduleOrderModel");

// Staff Login (No Token Required)
router.post("/staff/login", loginController.loginUser);

// Get All User Staff 
router.get("/staff/getAllUsers", registerController.getAllUsers);


// Get All Floor (Protected Routes)
router.get("/getAllFloors",validateToken,protectedRoute, floorController.getFloors);
// Get Table By Floor Id (Single Floor) (Protected Routes)
router.get("/getFloorById/:id",validateToken,protectedRoute, floorController.getFloorById);



// Get All Tables (Protected Routes)
router.get("/getAllTables",validateToken,protectedRoute, tablesController.getAllTables);
// Get Table By Table Id (Single Table) (Protected Routes)
router.get("/getTableById/:id",validateToken,protectedRoute, tablesController.getTableById);



// Create Customer (Protected Routes)
router.post("/createCustomer", customerController.createCustomer);
// Get All Customer (Protected Routes)
router.get("/GetAllCustomers",validateToken,protectedRoute, customerController.getAllCustomers);
// Get Customer By Customer Id (Single Customer) (Protected Routes)
router.get("/getCustomerById/:id",validateToken,protectedRoute, customerController.getCustomerById);


// Add Menu 
router.post("/createMenu",menuController.addMenu);
// Get All Menu
router.get("/getAllMenu",validateToken,protectedRoute,menuController.getAllMenu);



// Order
router.get("/todayorder",orderController.todayOrder);




// All Previous Order in this customer 
router.post("/previous/order", previousOrderController.createPreviousOrder);
// Get All Prevoius Order
router.get("/getPreviousOrder/:customerNumber", previousOrderController.getOrderByNumber);


//Sehdule Order in the customer 
router.post("/scheduleOrder", scheduleOrderController.addScheduleOrder);
//Get All Schedule Order
router.get("/getAllSecheduleOrder", scheduleOrderController.getAllScheduleOrder) 

// Billing 
router.post("/bill", billController.billingOrder);
// Get All Bills
router.get("/getAllBilling",validateToken,billController.getAllBill);

// Payment 
router.post("/payment", paymentController.userPayment);
// Get All Paymnet
router.get("/getAllPayments",validateToken,paymentController.getAllPayments);


module.exports = router;
