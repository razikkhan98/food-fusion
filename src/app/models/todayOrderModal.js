// const mongoose = require("mongoose");

// const todayOrderSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },
//     customerName: {
//       type: String,
//       required: true,
//     },
//     orderType: {
//       type: String,
//       required: true,
//       enum: ["Dine in", "Take away", "Delivery"],
//     },
//     tableNumber: {
//       type: Number,
//       default: null,
//     },
//     deliveryAddress: {
//       type: String,
//       default: null,
//     },
//     menuId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Menu",
//     },
//     timeStart: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("TodayOrder", todayOrderSchema);

const mongoose = require("mongoose");

const orderEntrySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
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
