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

export const getAllProductsRepo = async () => {
	return await Product.find();
};
