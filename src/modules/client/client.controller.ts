import { Request, Response } from "express";
import { createClientService } from "./client.service";

export const createClientController = async (req: Request, res: Response) => {
	try {
		const client = await createClientService(req.body);

		return res
			.status(201)
			.json({ data: client, message: "Client created successfully" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Failed to create client" });
	}
};
