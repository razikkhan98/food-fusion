const asyncHandler = require("express-async-handler");
const previousOrderModel = require("../../models/previousOrderModel");
const menuModel = require("../../models/menuModel");

// Create a new order
exports.createPreviousOrder = asyncHandler(async (req, res) => {
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
        const exitingEmail = await previousOrderModel.findOne({ customerEmail })
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

        const order = await previousOrderModel.create({
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
 * Retrieve all orders
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllOrder = async (req, res) => {
    try {
        const customerOrder = await previousOrderModel.find().populate("fullMenus");
        res.status(200).json({ success: true, data: customerOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};