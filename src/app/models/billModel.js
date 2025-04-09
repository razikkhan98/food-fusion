const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    default: null,
    // required: true,
  },
  menuID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
      // required: true
  },
  floorName: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true
  },
  orderID: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
},
{
    timestamps: true,
  }
);

module.exports = mongoose.model("Billing", billingSchema);
