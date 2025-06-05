import captainModel from "../models/captain.model.js";
import userModel from "../models/user.model.js";

export async function createUser({ firstName, lastName, email, password }) {
  if (!firstName || !lastName || !email || !password) {
    console.log("Some field is missing!");
    throw new Error("Some field is missing!");
  }

  const user = await userModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
}

export async function createCaptain({
  firstName,
  lastName,
  email,
  password,
  vehicle,
}) {
  const { name, numPlate, type, capacity } = vehicle;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !name ||
    !numPlate ||
    !type ||
    !capacity
  ) {
    console.log("Some field is missing!");
    throw new Error("Some field is missing!");
  }

  const captain = await captainModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      name,
      numPlate,
      type,
      capacity,
    },
  });

  return captain;
}
