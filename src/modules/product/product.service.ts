import { IProduct } from "./product.model";
import { createProductRepo, getAllProductsRepo } from "./product.repository";

export const createProductService = async (
	product: Partial<IProduct>,
): Promise<IProduct> => {
	return await createProductRepo(product);
};

export const getAllProductService = async () => {
	return await getAllProductsRepo();
};
