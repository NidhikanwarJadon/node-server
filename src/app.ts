import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import api from "./core/apiGenerator";

dotenv.config();
const app = express();
app.use(express.json());
api(app);
connectDB();

export default app;
