import mongoose, { Document, Schema } from "mongoose";

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

const Product = mongoose.model<IProduct>("Product", productSchema);

export const model = Product;
export { Product, productSchema };
