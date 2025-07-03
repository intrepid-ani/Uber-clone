import { Router } from "express";
import { body } from "express-validator";
import {
  loginCaptain,
  registerCaptain,
  getProfile,
  logoutCaptian,
} from "../controllers/captain.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const captainRouter = Router();

captainRouter.post(
  "/register",
  [
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("first name must consist of 3+ characters!"),
    body("email")
      .isEmail()
      .withMessage("Invalide email!")
      .exists()
      .withMessage("Email is required")
      .notEmpty()
      .withMessage("Email must not be empty"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password must not be empty"),
    //   vehicle
    body("vehicle.name")
      .exists()
      .withMessage("Vechile name is required")
      .isLength({ min: 3 })
      .withMessage("Vehicle name must have 3 characters"),
    body("vehicle.numPlate")
      .exists()
      .withMessage("Vechile number plate is required"),
    body("vehicle.type")
      .exists()
      .withMessage("Vechile Type is required")
      .isIn(["motorBike", "auto", "car"])
      .withMessage("Invalid Input!"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Vechile capacity aleast 1 "),
  ],
  registerCaptain
);

captainRouter.post(
  "/login",
  [
    body("email")
      .exists()
      .withMessage("Email is required")
      .notEmpty()
      .withMessage("Email must not be empty")
      .isEmail()
      .withMessage("Invalide email!"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password must not be empty"),
  ],
  loginCaptain
);

captainRouter.get("/getprofile", userAuth, getProfile);

captainRouter.post("/logout", userAuth, logoutCaptian);

export default captainRouter;
