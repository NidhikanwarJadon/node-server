import mongoose, { Document, model, Schema, Types } from "mongoose";

export type OrderStatus =
	| "PLACED"
	| "CONFIRMED"
	| "SHIPPED"
	| "DELIVERED"
	| "CANCELLED";

export interface IOrderItem {
	product: Types.ObjectId;
	quantity: number;
	price: number;
}

export interface IOrder extends Document {
	userId: Types.ObjectId;
	items: IOrderItem[];
	totalAmount: number;
	status: OrderStatus;
	createdAt: Date;
	updatedAt: Date;
}

const orderItemSchema: Schema<IOrderItem> = new mongoose.Schema({
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: false },
});

const orderSchema: Schema<IOrder> = new mongoose.Schema(
	{
		userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
		items: {
			type: [orderItemSchema],
			required: true,
		},
		totalAmount: { type: Number, required: true },
		status: {
			type: String,
			enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
			required: true,
			default: "PLACED",
		},
	},
	{
		timestamps: true,
	},
);

export const Order = model<IOrder>("Order", orderSchema);
