import { validationResult } from "express-validator";
import blacklistToken from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/user.sevice.js";

export async function registerCaptain(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Incomplete or incorrect details shared!" });
  }

  //   get data from the body
  const { fullname, email, password, vehicle } = req.body;

  // Check Captain exists
  const isCaptainExists = await captainModel.findOne({ email });
  if (isCaptainExists) {
    return res
      .status(400)
      .json({ message: "Captain already exist with email shared" });
  }

  //   hashing password
  const hashedPassword = await captainModel.hashPassword(password);

  const captian = await createCaptain({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashedPassword,
    vehicle,
  });
  const token = await captian.generateToken();

  //Allow direct login
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "none", // needed for cross-site requests
      secure: process.env.NODE_ENV === "production", // only use in production for security
    })
    .status(201)
    .json({ captian, message: "Captian Register and LogIn Successful!" });
}

export async function loginCaptain(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // return res.status(400).json({ Error: errors.array() });
    return res.status(400).json({
      error: errors.array() || "Incomplete or incorrect details shared!",
    });
  }

  const { email, password } = req.body;

  // find the captain
  // Using select("+password") to add password field to default selection
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  // Verify the captain identity - bcrypt
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }
  const token = await captain.generateToken();
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "none", // needed for cross-site requests
      secure: process.env.NODE_ENV === "production", // only use in production for security
    })
    .status(201)
    .json({ message: `Welcome ${captain.fullname.firstName}` });
}

export async function getProfile(req, res) {
  res.status(201).json(req.captain);
}

export async function logoutCaptian(req, res) {
  const token = req.token;
  res.clearCookie("token");
  await blacklistToken.create({ token });

  res.status(201).json({ message: "Logout successfully!" });
}
