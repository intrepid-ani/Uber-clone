import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionResponse = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database Succesfully!!");
    console.log(connectionResponse.connection.host);
  } catch (error) {
    console.log("Failed to connect Database!. -> Procces Abort", error.message);
    process.exit(1);
  }
}

export default connectDB;
