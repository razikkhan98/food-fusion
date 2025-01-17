const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    session: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
