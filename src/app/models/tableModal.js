const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    tableName: {
      type: String,
      required: [true, "Table name is required"],
    },

    tableNumber: {
      type: Number,
      required: [true, "Table number is required"],
    },

    tableChairs: {
      type: Number,
      required: [true, "Number of chairs is required"],
    },

    tableStatus: {
      type: String,
      enum: ["Cancelled", "Reserved", "Available", "Completed"],
    },

    bookingDate: {
      type: Date,
    },

    bookingStartTime: {
      type: String,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    no_of_person: {
      type: Number,
    },

    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Table", tableSchema);
