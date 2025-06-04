import { Router } from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/user.controller.js";

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

export default userRouter;
