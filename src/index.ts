import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import AllRoute from "../controller/userController";
import router from "../controller/ProductController";

const port = 4573;
const url = "mongodb://0.0.0.0:27017/BARA_BE";
const LIVE_URI =
  "mongodb+srv://Esther:Esther2004@cluster0.byfqhoj.mongodb.net/BARA_BE?retryWrites=true&w=majority";
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(LIVE_URI)
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log("failed to connect", err);
  });

app.use("/api/products", router);
app.use("/api/users", AllRoute);

app.listen(port, () => {
  console.log("listening on port", port);
});
