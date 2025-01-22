const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
  {
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
    CountryCode: {
      type: String,
      default: "+91",
    },
    mobileNum: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      minlength: 10,
      maxlength: 10,
    },
    altNum: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 10,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
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
      enum: ["Admin", "Cashier", "Staff", "Captain", "Chef"],
    },
    joining: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
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
  },
  { timestamps: true }
);

// Add role-based auto-increment field
userSchema.plugin(AutoIncrement, {
  inc_field: "sequence",
  id: "role_seq",
  reference_fields: ["role"],
});

module.exports = mongoose.model("User", userSchema);
