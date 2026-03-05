import { Types } from "mongoose";
import { IOrder, Order, OrderStatus } from "./order.model";

export const createOrderRepo = async (
	order: Partial<IOrder>,
): Promise<IOrder> => {
	return await Order.create(order);
};

export const findOrderById = async (id: string): Promise<IOrder | null> => {
	return await Order.findById(id);
};

export const updateOrderStatus = async (
	id: string,
	status: OrderStatus,
): Promise<IOrder | null> => {
	return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

export const getAllOrders = async (
	userId: Types.ObjectId,
	skip: number,
	limit: number,
) => {
	return await Order.find({ userId })
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);
};

export const countOrders = async (userId: Types.ObjectId) => {
	return await Order.countDocuments({ userId });
};
