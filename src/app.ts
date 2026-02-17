import express from "express";
import router from "./routes";
import connectDB from "./config/db";

const app = express();
app.use(express.json());

connectDB();
app.use("/", router);

export default app;
