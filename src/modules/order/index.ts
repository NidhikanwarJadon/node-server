import { Router } from "express";
import { createValidationMiddlewares } from "../../middlewares/validation";
import * as orderController from "./order.controller";
import { orderValidator } from "./order.validator";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";

export const createOrderHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(orderValidator) as Middleware[]),
	);

	router.post(
		"/:userId",
		...(middlewares as any[]),
		orderController.createOrder,
	);
};

export const updateOrderStatusHandler = (router: Router) => {
	router.put("/:id", orderController.changeOrderStatusHandler);
};

export const getAllOrdersHandler = (router: Router) => {
	router.get("/:userId", orderController.orderListingHandler);
};
