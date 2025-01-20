const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Customer email is required"],
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
