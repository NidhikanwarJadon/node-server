import dotenv from "dotenv";
import express from "express";
import router from "./routes";
import connectDB from "./config/db";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.use("/", router);

export default app;
