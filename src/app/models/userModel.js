const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 100,
  },
  mobileNum: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  altNum: {
    type: Number,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 200,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    enum: ["Admin", "Cashier", "Staff", "Captain", "Chef"],
  },
  joining: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
});

// Add auto-increment field
userSchema.plugin(AutoIncrement, { inc_field: "code" });

module.exports = mongoose.model("User", userSchema);
