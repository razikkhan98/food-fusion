// Cashier Add Menu 
const menuModel = require("../../models/menuModel");
 exports.addMenu = async (req , res)=>{
try{
const menuData = req.body;

const generateOrderID = `ORD-${Date.now()}`; // Simple order ID generation

// Create new menu 
const newMenu = new menuModel({
  customerID: menuData.customerID,
  floorName: menuData.floorName || null,
  tableNumber: menuData.tableNumber || null,
  orderID:generateOrderID,
  categories: menuData.categories
});
await newMenu.save();

res.status(400).json({message: "Add Menu Successfully!", data: newMenu});

}catch(error){
  console.error(error);
  res.status(500).json({ message: "Failed to create Menu", error: error.message });
}
 };


 /**
  * Retrieve all menu
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  */
 exports.getAllMenu = async (req ,res) => {
     try {
         const customerMenu = await menuModel.find();
         res.status(200).json({ success: true, data: customerMenu });
     } catch (error) {
         res.status(500).json({ success: false, message: error.message });
     }
 };
 
