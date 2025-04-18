const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
// const roleMapping = require("../../../app/utils/roleMapping");
const { generateCode } = require("../../../app/utils/code");

/**
 * Register a new user, validate input data, and save the user to the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing user registration data.
 * @param {string} req.body.fullname - The full name of the user.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.password - The password for the user.
 * @param {number} req.body.mobileNum - The primary mobile number of the user.
 * @param {number} [req.body.altNum] - The alternative mobile number of the user.
 * @param {string} req.body.address - The address of the user.
 * @param {string} req.body.role - The role of the user (e.g., Admin, Employee).
 * @param {string} req.body.joining - The joining date of the user.
 * @param {number} [req.body.salary] - The salary of the user.
 * @param {number} [req.body.age] - The age of the user.
 * @param {Object} res - Express response object.
 */


exports.register = asyncHandler(async (req, res, next) => {
  const {
    fullname,
    email,
    password,
    mobileNum,
    altNum,
    address,
    role,
    joining,
    salary,
    age,
  } = req.body;

  if (
    !fullname ||
    !email ||
    !password ||
    !mobileNum ||
    !role ||
    !salary
    ) {
    return res.json({ message: "All fields are required" });
  }

  if (!["Admin", "Cashier", "Staff", "Captain", "Chef"].includes(role))
    return res.json({ message: "Invalid role" });

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.json({ message: "Email already exists" });

    const existingUserByMobile = await userModel.findOne({ mobileNum });
    if (existingUserByMobile)
      return res.json({ message: "Mobile number already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      mobileNum,
      altNum,
      address,
      role,
      joining,
      salary,
      age,
      code: mobileNum,
    });

    // Generate code with role-based sequence
    const sequence = user.sequence; // sequence generated by mongoose-sequence
    user.code = generateCode(role, sequence, mobileNum);
    await user.save();

    res.json({
      success: true,
      message: `${role} registered successfully`,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        code: user.code,
      },
    });
  } catch (error) {
    console.error("error:", error);
    res.json({ message: "error", error: error.message });
  }
});


// Get All User Staff
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find()

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};