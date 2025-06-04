import { validationResult } from "express-validator";
import { createUser } from "../services/user.sevice.js";
import userModel from "../models/user.model.js";

export async function registerUser(req, res, next) {
  // Verifing the details
  const validatRes = validationResult(req);
  if (!validatRes.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Incomplete or incorrect details shared!" });
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

  // const hashedPassword =/
  // "asdfjadfaksdflkajsfdhkalsjdfhlkajshdflkasjdhflkadfj;asdfjlasdfjhaireuwperoiuqweoriusadfjhaskldjfh";

  const user = await createUser({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashedPassword,
  });

  const token = await user.generateToken();

  res.status(201).json({ token: token, user });
}
