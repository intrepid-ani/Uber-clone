import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import connectDB from "./connectdb.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on the port -> http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error: Connecting the Database: ", err);
  });
