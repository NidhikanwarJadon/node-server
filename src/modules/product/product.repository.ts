import { Types } from "mongoose";
import { IProduct, Product } from "./product.model";

export const createProductRepo = async (
	product: Partial<IProduct>,
): Promise<IProduct> => {
	return await Product.create(product);
};

export const getProductByIdRepo = async (id: Types.ObjectId) => {
	return await Product.findById(id);
};

export const getAllProductsRepo = async (skip: number, limit: number) => {
	return await Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
};

export const countProducts = async () => {
	return await Product.countDocuments();
};
