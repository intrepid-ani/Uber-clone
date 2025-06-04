import { Router } from "express";
import { body } from "express-validator";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post(
  "/register",
  [
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("firt name must consist of 3+ characters!"),
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
  ],
  registerUser
);

userRouter.post(
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
  loginUser
);

userRouter.get("/profile", userAuth, getProfile);

userRouter.post("/logout", userAuth, logoutUser);

export default userRouter;
