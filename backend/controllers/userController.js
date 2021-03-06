const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// @desc Register Users
// @route POST /api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw Error(`User with email ${email} already exists`);
  }

  // Ecrypt Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }

  res.status(200).json({ message: "register" });
});

// @desc Authenticate a User
// @route POST /api/users/login
// access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

// @desc Get a User data
// @route GET /api/users/me
// access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//Generate JWT

generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
