const mongoose = require("mongoose");

const orderTableSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
      required: true,
    },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    floorName: {
      type: String,
      required: false,
    },
    tableNumber: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      default: "Order making", // Can be changed to other statuses like 'Cooking', 'Served', etc.
    },
    categories: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true, // Includes createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("OrderTable", orderTableSchema);
