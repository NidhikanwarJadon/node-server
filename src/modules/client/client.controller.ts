import { Request, Response } from "express";
import * as clientService from "./client.service";

export const createClientController = async (req: Request, res: Response) => {
	try {
		const client = await clientService.createClientService(req.body);

		return res
			.status(201)
			.json({ data: client, message: "Client created successfully" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Failed to create client" });
	}
};

export const bulkCreateClientController = async (
	req: Request,
	res: Response,
) => {
	try {
		await clientService.bulkCreateClientService(req.file);

		return res.status(201).json({ message: "Bulk client creation completed" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.cause || err.message || "Bulk upload failed" });
	}
};

export const getClients = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

		const results = await clientService.getClients(page, limit);

		return res
			.status(200)
			.json({ results, message: "Client data retrived successfully" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Error fetching clients" });
	}
};

export const createAssociateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { email, role } = req.body;

		if (!id) {
			return res.status(400).json({ message: "Client Id not found" });
		}

		if (!email || !role) {
			return res.status(400).json({ message: "Email and role required" });
		}
		const result = await clientService.createAssociateUserService(
			id as string,
			req.body,
		);
		return res
			.status(201)
			.json({ result, message: "Associate User created successfully" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Failed to create associate user" });
	}
};

export const updateAssociateUser = async (req: Request, res: Response) => {
	try {
		const { clientId, userId } = req.params;

		if (!clientId || !userId) {
			return res
				.status(400)
				.json({ message: "ClientId and UserId are required" });
		}

		const result = await clientService.updateAssociateUserService(
			clientId as string,
			userId as string,
			req.body,
		);

		return res
			.status(200)
			.json({ result, message: "Associate user updated successfully" });
	} catch (err: any) {
		return res.status(500).json({
			error: err.message || "Failed to update associate user",
		});
	}
};
