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
