import express, { json } from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import captainRouter from "./routes/captain.route.js";

const app = express();

app.use(
  cors({
    origin: true, // Allow the request origin
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/captain", captainRouter);

export default app;
