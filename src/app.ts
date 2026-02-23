import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import api from "./core/apiGenerator";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
api(app);
connectDB();

export default app;
