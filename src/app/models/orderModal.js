const mongoose= require("mongoose");

const orderSchema = new mongoose.Schema({
  orderID: {
     type: String, 
   //   required: true, 
     unique: true 
    },
  tableNumber: {
     type: Number, 
     required: true 
    },
  items: {
     type: Array,
     required: true 
    },
  status: {
     type: String, 
     default: 'pending' 
    },
   //   sequence_value: { 
   //    type: Number, 
   //    default: 1000 
   // },
  createdAt: {
     type: Date, 
     default: Date.now
     },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema); 