const asyncHandler = require("express-async-handler");
const UserModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Session = require("../../models/session/sessionModel");

/**
 * Login a user with their unique code, generate a session, and issue a JWT token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - { code } The request body containing the user's code.
 * @param {string} req.body.code - The unique code for the user.
 * @param {Object} res - Express response object.
 */

exports.loginUser = asyncHandler(async (req, res) => {
  const { code, role } = req.body;
 
  // Validate inputs
  if (!code || !role) {
    return res.status(400).json({ message: "Code and role are required" });
  }
 
  // Find user by code and role
  const user = await UserModel.findOne({ code, role });
 
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid code or role" });
  }
 
  // Generate a new unique session ID
  const session = uuidv4();
 
  // Check for existing session
  const existingSession = await Session.findOne({ userId: user._id });
 
  if (!existingSession) {
    // Create new session
    await Session.create({ session, userId: user._id });
  } else {
    // Update existing session
    await Session.findOneAndUpdate(
      { userId: user._id },
      { $set: { session } },
      { new: true }
    );
  }
 
  // Generate JWT token
  const token = jwt.sign(
    {
      user: {
        username: user.fullname,
        email: user.email,
        id: user._id,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
 
  // Send success response
  res.json({
    success: true,
    message: "Login successful",
    session,
    user: {
      fullname: user.fullname,
      role: user.role,
    },
    accessToken: token,
  });
});