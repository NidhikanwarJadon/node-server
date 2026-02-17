import { Router } from "express";
import { deleteFile, readUserFile, writeInFile } from "./file.controller";

const fileRouter = Router();

fileRouter.get("/", readUserFile);
fileRouter.post("/", writeInFile);
fileRouter.delete("/", deleteFile);

export default fileRouter;
