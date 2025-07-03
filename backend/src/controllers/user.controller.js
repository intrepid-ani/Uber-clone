import { validationResult } from "express-validator";
import { createUser } from "../services/user.sevice.js";
import userModel from "../models/user.model.js";
import blacklistToken from "../models/blacklistToken.model.js";

export async function registerUser(req, res, next) {
  // Verifing the details
  const validatRes = validationResult(req);
  if (!validatRes.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Incomplete or incorrect details shared!" });
  }

  const { fullname, email, password } = req.body;

  // Check weather the users already there
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res
      .status(400)
      .json({ message: "User already exist with email shared" });
  }

  // hashing the password
  const hashedPassword = await userModel.hashPassword(password);
  console.log(hashedPassword);

  const user = await createUser({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashedPassword,
  });
  const token = await user.generateToken();

  //Allow direct login

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "none", // needed for cross-site requests
      secure: process.env.NODE_ENV === "production", // only use in production for security
    })
    .status(201)
    .json({ user, message: "User Register and LogIn Successful!", token });
}

export async function loginUser(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // return res.status(400).json({ Error: errors.array() });
    return res.status(400).json({
      error: errors.array() || "Incomplete or incorrect details shared!",
    });
  }

  const { email, password } = req.body;

  // find the user
  // Using select("+password") to add password field to default selection
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  // Verify the user identity - bcrypt
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }
  const token = await user.generateToken();
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "none", // needed for cross-site requests
      secure: process.env.NODE_ENV === "production", // only use in production for security
    })
    .status(201)
    .json({
      message: `Welcome ${user.fullname.firstName}`,
      loginData: {
        fullname: {
          firstName: user.fullname.firstName,
          lastName: user.fullname.lastName,
        },
        email: user.email,
      },
      token,
    });
}

export async function getProfile(req, res) {
  res.status(201).json(req.user);
}

export async function logoutUser(req, res) {
  const token = req.token;
  res.clearCookie("token");

  const addToBlacklist = await blacklistToken.create({ token });

  res.status(201).json({ message: "Logout successfully!" });
}
