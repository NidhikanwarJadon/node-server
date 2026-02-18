import { Request, Response } from "express";
import {
	createOrderService,
	getAllOrdersService,
	updateOrderStatusService,
} from "./order.service";
import { OrderStatus } from "./order.model";
import { Types } from "mongoose";
import { sendEmail } from "../../services/emailService";

export const createOrderHander = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		if (!userId) {
			return res.status(400).json({ message: "UserId not found" });
		}

		const order = await createOrderService({
			...req.body,
			userId: userId as string,
		});

		return res.status(201).json({
			data: order,
			message: "Order created successfully",
		});
	} catch (err: any) {
		return res.status(500).json({
			error: err.message || "Error creating order",
		});
	}
};

export const changeOrderStatusHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		if (!id || !status) {
			return res.status(400).json({ message: "Invalid request" });
		}

		const updatedOrder = await updateOrderStatusService(
			id as string,
			status as OrderStatus,
		);

		return res.status(200).json({
			data: updatedOrder,
			message: "Order status updated successfully",
		});
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Error updating status" });
	}
};

export const orderListingHandler = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(400).json({ message: "UserId not found" });
		}

		const data = await getAllOrdersService(userId as unknown as Types.ObjectId);
		return res
			.status(201)
			.json({ data, message: "Orders retrieved successfully" });
	} catch (err: any) {
		return res
			.status(500)
			.json({ error: err.message || "Error retrieving order" });
	}
};

export const testEmailController = async (req: Request, res: Response) => {
	try {
		await sendEmail(
			"nidhi.kanwar+1@tntra.io",
			"Test Email",
			"Hello Nidhi, this is a test email",
		);

		res.status(200).json({ message: "Email sent successfully" });
	} catch (error) {
		res.status(500).json({ message: "Failed to send email" });
	}
};
