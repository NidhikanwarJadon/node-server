import { Router } from "express";
import { createValidationMiddlewares } from "../../middlewares/validation";
import * as orderController from "./order.controller";
import { orderValidator } from "./order.validator";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";
import { authenticateUser } from "../../middlewares/authMiddleware";

export const createOrderHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(orderValidator) as Middleware[]),
		authenticateUser,
	);

	router.post(
		"/:userId",
		...(middlewares as any[]),
		orderController.createOrder,
	);
};

export const updateOrderStatusHandler = (router: Router) => {
	router.put(
		"/:id",
		authenticateUser,
		orderController.changeOrderStatusHandler,
	);
};

export const getAllOrdersHandler = (router: Router) => {
	router.get(
		"/:userId",
		authenticateUser,
		orderController.orderListingHandler,
	);
};

export const testEmailHandler = (router: Router) => {
	router.get(
		"/test-email",
		authenticateUser,
		orderController.testEmailController,
	);
};
