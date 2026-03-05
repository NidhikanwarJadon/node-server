import { IProduct } from "./product.model";
import {
	countProducts,
	createProductRepo,
	getAllProductsRepo,
} from "./product.repository";

export const createProductService = async (
	product: Partial<IProduct>,
): Promise<IProduct> => {
	return await createProductRepo(product);
};

export const getAllProductService = async (page: number, limit: number) => {
	const skip = (page - 1) * limit;

	const [products, total] = await Promise.all([
		getAllProductsRepo(skip, limit),
		await countProducts(),
	]);
	return {
		data: products,
		currentPage: page,
		totalPages: Math.ceil(total / limit),
		totalRecord: total,
	};
};
