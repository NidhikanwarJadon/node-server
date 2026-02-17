import { access, appendFile, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { Request, Response } from "express";

export const readUserFile = async (req: Request, res: Response) => {
	try {
		const filePath = path.join(process.cwd(), "src", "data-new.txt");
		const data = await readFile(filePath, "utf-8");

		res.status(200).json({ data, message: "File read successfully" });
	} catch (err) {
		res.status(500).json({ error: "Error reading file" });
	}
};

export const writeInFile = async (req: Request, res: Response) => {
	try {
		const { message } = req.body;

		if (!message) {
			return res.status(400).json({ error: "Message is required" });
		}

		const filePath = path.join(process.cwd(), "src", "data-new.txt");
		await appendFile(filePath, message + "\n");

		res.status(200).json({ message: "Data written successfully" });
	} catch {
		res.status(500).json({ error: "Error writing to file" });
	}
};

export const deleteFile = async (req: Request, res: Response) => {
	try {
		const filePath = path.join(process.cwd(), "src", "data.txt");
		await access(filePath);
		await unlink(filePath);
		res.status(200).json({ message: "File deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: "Error deleting file" });
	}
};
