import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import api from "./core/apiGenerator";
import cors from "cors";
dotenv.config();
const app = express();
app.use(
	cors({
		origin: "http://localhost:4000", // your FE URL
		credentials: true, // allow cookies
	}),
);
app.use(express.json());
app.use(cookieParser());
api(app);
connectDB();

export default app;
