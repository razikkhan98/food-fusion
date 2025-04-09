const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    totalTable: {  
      type: Number,
      required: true,
    },

    tableNumber: {
      type: Number,
      required: true,
    },

    totalChairs: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
    },
    floorNumber: {
      type: Number,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    floorUid:{
      type: String,
      required: true,
      unique: true
    },
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      default: null
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Table", tableSchema);
