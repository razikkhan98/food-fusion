

// exports.userOrder = async (req, res) => {
//   try {
//     const { tableNumber, items } = req.body;

//     // Validation
//     if (!tableNumber || !items || items.length === 0) {
//       return res.status(400).json({ message: 'Table number and items are required' });
//     }
    
//     // Generate Order ID 
//     const orderID = generateOrderId();
//     console.log(orderID);

//     const newOrder = new orderModel({
//       orderID,
//       tableNumber,
//       items,
//       status: "making"
//     });

//     await newOrder.save();

//     return res.status(201).json({ success: true, message: "Order send to kitchen", orderID, data: newOrder });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };




const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../../models/orderModal");
const generateOrderId = require("../../utils/code");

//  Create order send to kitchen
exports.userOrder = expressAsyncHandler (async (req, res) => {
  try {
    const orderId = await generateOrderId(); // Generate Order ID
    const newOrder = new orderModel({ ...req.body, orderID: orderId });
   console.log(orderId)
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, message: "Order send to kitchen", order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating order", error: error.message });
  }
});