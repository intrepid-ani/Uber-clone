import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const captainSchema = new Schema({
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

  vehicle: {
    name: {
      type: String,
      required: true,
      minLength: [3, "Vechicle Name must contain 3 or more character"],
    },
    numPlate: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["MotorBike", "auto", "car"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
  },

  location: {
    ltd: { type: String },
    lng: { type: String },
  },

  status: {
    type: Boolean,
    default: false,
  },

  socketid: {
    type: String,
  },
});

captainSchema.methods.generateToken = async function () {
  const sign = await jwt.sign({ _id: this._id }, process.env.JWT_SCERTE, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return sign;
};

captainSchema.statics.hashPassword = async function (password) {
  const result = bcrypt.hashSync(password, 10);
  return result;
};

captainSchema.methods.comparePassword = function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
};

const captainModel = model("captain", captainSchema);
export default captainModel;
