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
  const { code } = req.body;

  // Generate a unique session ID using uuid
  const session = uuidv4();

  // Validate that the code is provided
  if (!code) return res.json({ message: "Code is required" });

  // Find the user by the provided code
  const user = await UserModel.findOne({ code });

  if (!user) return res.json({ success: false, message: "Invalid code" });

  // session Data Mongodb Database
  const findSessionByUserId = await Session?.findOne({ userId: user?._id });

  if (!findSessionByUserId) {
    // Save the session to the database
    await Session.create({
      session,
      userId: user._id,
    });
  }

  // update session Mongodb Database
  if (findSessionByUserId?.session) {
    await Session?.findOneAndUpdate(
      { session: findSessionByUserId?.session },
      {
        $set: {
          session,
        },
      },
      { new: true }
    );
  }

  // Generate and send JWT token
  const token = jwt.sign(
    { user: { username: user?.fullname, email: user?.email, id: user?._id } },
    process.env.JWT_SECRET,
    { expiresIn: "30 day" }
  );

  // If the user is found, login is successful
  res.json({
    success: true,
    message: "Login successful.",
    session,
    user: { fullname: user?.fullname, role: user?.role },
    accessToken: token,
  });
});
