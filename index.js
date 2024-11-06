import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT;
const db = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  await mongoose.connect(db);
  console.log("db connected");
} catch (error) {
  handleError(error);
}

import UsersRouter from "./Routers/UsersRouter.js";
import SellHomeRouter from "./Routers/SellHomeRouter.js";
import ContactRouter from "./Routers/ContactRouter.js";

app.use("/api", UsersRouter, SellHomeRouter, ContactRouter);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
