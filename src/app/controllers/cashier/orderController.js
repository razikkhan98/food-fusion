const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../../models/orderModal");
// const {generateOrderId} = require("../../../app/utils/code");

//  Create order send to kitchen
exports.userOrder = expressAsyncHandler (async (req, res) => {
  try {
    const {
      // orderID,
      tableNumber,
      items,
      status
    }=req.body;

    const orderID = `ORD-${Date.now()}`; // Simple order ID generation

    // const orderId = generateOrderId(); // Generate Order ID
    // console.log(orderId)
    
    const newOrder = new orderModel({  
      orderID, 
      tableNumber,
      items,
      status: status || "pending",
    });
    console.log(tableNumber);

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, message: "Order send to kitchen", order: savedOrder });
  } catch(error) {
    res.status(500).json({ success: false, message: "Error creating order", error: error.message });
  }
});

