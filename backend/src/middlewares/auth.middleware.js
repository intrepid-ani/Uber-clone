import userModel from "../models/user.model.js";
import blacklistToken from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";

export async function userAuth(req, res, next) {
  // Get token from various sources
  let checkToken;

  if (req.cookies && req.cookies.token) {
    // Token from cookies (preferred)
    checkToken = req.cookies.token;
    console.log("Token found in cookies:", checkToken);
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Token from Authorization header
    checkToken = req.headers.authorization.split(" ")[1];
    console.log("Token found in Authorization header");
  } else if (req.body && req.body.token) {
    // Token from request body
    checkToken = req.body.token;
    console.log("Token found in request body");
  }

  if (!checkToken) {
    console.log("No token found:", {
      cookies: req.cookies,
      hasAuthHeader: !!req.headers.authorization,
    });
    return res.status(401).json({ message: "Unauthorized: No Token Found!" });
  }

  const inBlacklist = await blacklistToken.findOne({ checkToken });
  if (inBlacklist) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(checkToken, process.env.JWT_SCERTE);
    const id = decoded._id;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
