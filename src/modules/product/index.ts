import { Router } from "express";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";
import { createValidationMiddlewares } from "../../middlewares/validation";
import { productValidator } from "./product.validator";
import * as productController from "./product.controller";
import { authenticateUser } from "../../middlewares/authMiddleware";

export const createProductHandler = async (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(productValidator) as Middleware[]),
		authenticateUser,
	);

	router.post(
		"/",
		...(middlewares as any[]),
		productController.createProductController,
	);
};

export const getAllProductsHandler = async (router: Router) => {
	router.get("/", authenticateUser, productController.productListingController);
};
