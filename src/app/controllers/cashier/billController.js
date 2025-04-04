const asyncHandler = require("express-async-handler");
const billModel = require("../../models/billModel");
const menuModel = require("../../models/menuModel");
const customerModal = require("../../models/customerModal");

exports.billingOrder = asyncHandler(async (req, res) => {
    const {
        customerID,
        menuID,
        floorName,
        tableNumber,
        orderID,
        totalAmount
    } = req.body;
    
    // Validation
    if (
        // !customerID ||
        // !menuID ||
        !floorName ||
        !tableNumber ||
        !orderID ||
        !totalAmount
    ) {
        return res.status(200).json({ message: "All fields are required!" });
    }

    const customer = await customerModal.findById(customerID);
    if (!customer){
        return res.status(200).json({message: "Customer ID not found"});
    }

    // const menu = await menuModel.findById(menuID);
    // if (!menu){
    //     return res.status(200).json({message: "Menu ID not found"});
    // }

    // Create new billing record
    const newBilling = new billModel({
        customerID,
        menuID,
        floorName,
        tableNumber,
        orderID,
        totalAmount,
    });
    console.log(newBilling);

    const savedBilling = await newBilling.save();

    res.status(201).json({
        success: true,
        message: "Billing created successfully",
        data: savedBilling,
    });

});




exports.getAllBill = async (req, res) => {
    try {
        const Billing = await billModel.find();
        res.status(200).json({ success: true, data: Billing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//  .populate("CustomerID") 