import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  fullname: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "firt name must consist of 3+ characters!"],
      lowercase: true,
    },
    lastName: {
      type: String,
      lowercase: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Account exist on this email!"],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketid: {
    type: String,
  },
});

userSchema.methods.generateToken = async function () {
  const sign = await jwt.sign({ _id: this._id }, process.env.JWT_SCERTE, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return sign;
};

userSchema.statics.hashPassword = async function (password) {
  const result = bcrypt.hashSync(password, 10);
  return result;
};

userSchema.methods.comparePassword = function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
};

const userModel = model("user", userSchema);
export default userModel;
