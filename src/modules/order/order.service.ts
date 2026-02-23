import { Types } from "mongoose";
import { getUserByIdRepo } from "../user/user.repo";
import { IOrder, IOrderItem, OrderStatus } from "./order.model";
import {
	createOrderRepo,
	findOrderById,
	getAllOrders,
	updateOrderStatus,
} from "./order.repository";
import { getProductByIdRepo } from "../product/product.repository";
import { sendEmail } from "../../services/emailService";

export const createOrderService = async (
	order: Partial<IOrder>,
): Promise<IOrder> => {
	const { userId, items } = order;
	const processedItems: IOrderItem[] = [];

	if (!userId) {
		throw new Error("UserId is required");
	}
	const user = await getUserByIdRepo(userId);
	if (!user) {
		throw new Error("User not found");
	}
	if (!items || items?.length === 0) {
		throw new Error("Order must have at least one item");
	}

	for (const item of items) {
		const product = await getProductByIdRepo(item.product);
		if (!product) {
			throw new Error("Product not found");
		}

		if (!product.isActive) {
			throw new Error("Product is not available");
		}

		processedItems.push({
			product: product._id,
			quantity: item.quantity,
			price: product.price,
		});
	}

	const totalAmount = processedItems.reduce(
		(sum, item) => sum + item?.price * item?.quantity,
		0,
	);

	return await createOrderRepo({
		...order,
		items: processedItems,
		totalAmount,
	});
};

const allowedStatusTransitions: Record<OrderStatus, OrderStatus[]> = {
	PLACED: ["CONFIRMED", "CANCELLED"],
	CONFIRMED: ["SHIPPED", "CANCELLED"],
	SHIPPED: ["DELIVERED"],
	DELIVERED: [],
	CANCELLED: [],
};

export const updateOrderStatusService = async (
	id: string,
	status: OrderStatus,
): Promise<IOrder | null> => {
	const order = await findOrderById(id);
	if (!order) {
		throw new Error("Order not found");
	}

	const oldStatus = order.status;
	if (!allowedStatusTransitions[order.status].includes(status)) {
		throw new Error(
			`Cannot change order status from ${order.status} to ${status} `,
		);
	}

	if (status === oldStatus) {
		return order;
	}

	const user = await getUserByIdRepo(order.userId);
	if (!user) {
		throw new Error("User not found");
	}

	await sendEmail(user.email, "Order Status Updated", "orderStatus", {
		name: user.firstName,
		orderId: order._id.toString(),
		oldStatus: oldStatus,
		currentStatus: status,
	});

	return await updateOrderStatus(id, status);
};

export const getAllOrdersService = async (userId: Types.ObjectId) => {
	await getUserByIdRepo(userId);
	return await getAllOrders(userId);
};
