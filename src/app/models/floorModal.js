const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
      floorUid:{
        type: String,
        required: true,
        unique: true
      },

    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
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
     
    },
    tables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        default: null
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Floor", floorSchema);
