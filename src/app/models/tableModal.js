const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
    },

    totalChairs: {
      type: Number,
      required: true,
    },

    floorNumber: {
      type: Number,
      required: true,
    },
    floorName: {
      type: String,
      required: true,
    },
    tablestatus: {
      type: String,
      trim: true,
      enum: [
        "empty",
        "Order pending",
        "Order making",
        "Table reserved",
        "Order completed"
      ],
      default: "empty"
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    floorUid: {
      type: String,
      required: true,
     
    },
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Table", tableSchema);
