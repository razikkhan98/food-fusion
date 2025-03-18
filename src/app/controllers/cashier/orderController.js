const asyncHandler = require("express-async-handler");
const orderModel = require("../../models/orderModel");
const menuModel = require("../../models/menuModel");

// Create a new order
exports.createOrder = asyncHandler(async (req, res) => {
    try {
        const {
            customerName,
            customerNumber,
            customerEmail,
            deliveryAddress,
            customerStatus,
            ordeDate,
            orderTime,
            fullMenus
        } = req.body;

        // Validation
        if (!customerName &&
            !customerNumber &&
            !customerEmail &&
            !deliveryAddress &&
            !customerStatus &&
            !fullMenus
        ) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check Email already exists or not
        const exitingEmail = await orderModel.findOne({ customerEmail })
        if (exitingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

// // Check if the floorId exists
//     const menu = await menuModel.findById(fullMenus);
//     if (!menu) {
//       res.status(404).json({
//         success: false,
//         message: `No menu found with ID: ${fullMenus}`,
//       });
//       return;
//     }

        const order = await orderModel.create({
            customerName,
            customerNumber,
            customerEmail,
            deliveryAddress,
            customerStatus,
            ordeDate,
            orderTime,
            fullMenus
        });

        await order.save();
        res.status(201).json({
            success: true,
            message: "Pervious Order generated successfully",
            // data: PreviousOrder
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create previous order",
            error: error.message
        });
    }
});


/**
 * Retrieve all customers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllOrder = async (req, res) => {
    try {
        const customerOrder = await orderModel.find().populate("fullMenus");
        res.status(200).json({ success: true, data: customerOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};