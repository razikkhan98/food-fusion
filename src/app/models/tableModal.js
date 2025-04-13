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
