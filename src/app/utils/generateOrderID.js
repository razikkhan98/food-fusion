const menuModel = require("../models/menuModel");

const generateOrderID = async () => {
    const lastOrder = await menuModel.findOne().sort({ createdAt: -1 }); // Get the last created order
  
    let lastNumber = 0;
    if (lastOrder && lastOrder.orderID) {
      const match = lastOrder.orderID.match(/ORD-(\d+)/);
      if (match) {
        lastNumber = parseInt(match[1]);
      }
    }
  
    const newNumber = lastNumber + 1;
    const padded = String(newNumber).padStart(2, "0"); // ORD-01, ORD-02
    return `ORD-${padded}`;
  };
  
module.exports = generateOrderID;