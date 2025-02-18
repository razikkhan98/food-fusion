const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
      unique: true,
      trim: true,
    },

    floorName: {
      type: String,
      required: [true, "Floor name is required"],
      unique: true,
      trim: true,
    },
    floorNumber: {
      type: Number,
      required: [true, "Floor number is required"],
      unique: true,
      min: [1, "Floor number must be at least 1"],
    },
    floorCapacity: {
      type: Number,
      required: [true, "Floor capacity is required"],
      min: [20, "Floor capacity must be at least 20"],
    },
    tables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Floor", floorSchema);
