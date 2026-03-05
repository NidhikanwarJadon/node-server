import { Request, Response } from "express";
import { createProductService, getAllProductService } from "./product.service";

export const createProductController = async (req: Request, res: Response) => {
	try {
		const data = await createProductService(req.body);
		return res
			.status(201)
			.json({ data, messgae: "Product created successfully" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Error creating product" });
	}
};

export const productListingController = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const data = await getAllProductService(page, limit);
		return res
			.status(201)
			.json({ data, message: "Product retrieved successfully" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Error retrieving product" });
	}
};
