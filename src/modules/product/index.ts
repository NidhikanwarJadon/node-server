import { Router } from "express";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";
import { createValidationMiddlewares } from "../../middlewares/validation";
import { productValidator } from "./product.validator";
import * as productController from "./product.controller";

export const createProductHandler = async (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(productValidator) as Middleware[]),
	);

	router.post(
		"/",
		...(middlewares as any[]),
		productController.createProductController,
	);
};

export const getAllProductsHandler = async (router: Router) => {
	router.get("/", productController.productListingController);
};
