const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const generateCode = require("../../../utils/code");
const roleMapping = require("../../../utils/roleMapping");

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

  // Validate the input data
  if (
    !fullname &&
    !email &&
    !password &&
    !mobileNum &&
    !address &&
    !role &&
    !joining
  ) {
    return res.json({ message: "All fields are required" });
  }

  // Verify role and get role_id
  const role_id = roleMapping[role];
  if (!role_id) return res.json({ message: "Invalid role" });

  try {
    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.json({ message: "Email already exists" });

    // Check if user already exists by mobile number
    const existingUserByMobile = await userModel.findOne({ mobileNum });
    if (existingUserByMobile)
      return res.json({ message: "Mobile number already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      mobileNum,
      altNum,
      address,
      role,
      role_id,
      joining,
      code: "",
      salary,
      age,
    });

    // Update and save the user's code with new logic if necessary
    const newCode = generateCode(role, mobileNum, user.newCode);
    user.code = newCode;
    await user.save();

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Database error:", error); // Log the error for debugging
    res.json({ message: "Database error", error: error.message });
  }
});
