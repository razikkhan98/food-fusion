const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      unique: true,
      trim: true,
      match: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    customerCountryCode: {
      type: String,
      trim: true,
      // required: true,
      default: "+91",
    },
    customerPhoneNumber: {
      type: String,
      trim: true,
      required: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      minlength: 10,
      maxlength: 10,
    },
    customerStatus: {
      type: String,
      trim: true,
      required: true,
      default: "Order pending",
      enum: [
        "Order pending",
        "Order making",
        "Table reserved",
        "Order completed",
      ],
    },
    orderType: {
      type: String,
      required: true,
      default: "Dine in",
      enum: ["Dine in", "Take away", "Delivery"],
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
