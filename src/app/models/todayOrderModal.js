

const mongoose = require("mongoose");

const orderEntrySchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    customerUid: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: Number,
      default: null,
    },
    deliveryAddress: {
      type: String,
      default: null,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    timeStart: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      trim: true,
      default: "Order pending",
      enum: [
        "empty",
        "Order pending",
        "Order making",
        "Table reserved",
        "Order completed"
      ],
    },
  },
  { _id: false }
);

const todayOrderSchema = new mongoose.Schema(
  {
    dine: [orderEntrySchema],
    takeaway: [orderEntrySchema],
    delivery: [orderEntrySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodayOrder", todayOrderSchema);
