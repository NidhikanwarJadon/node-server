import mongoose, { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
	name: string;
	price: number;
	isActive: boolean;
}

const productSchema: Schema<IProduct> = new mongoose.Schema<IProduct>(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true, min: 0 },
		isActive: { type: Boolean, default: true, required: true },
	},
	{
		timestamps: true,
	},
);

export const Product = model<IProduct>("Product", productSchema);
