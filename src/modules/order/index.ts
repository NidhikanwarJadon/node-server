import { NextFunction, Request, Response, Router } from "express";
import { createValidationMiddlewares } from "../../middlewares/validation";
import * as orderController from "./order.controller";
import { orderValidator } from "./order.validator";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

const composeMiddlewares = (...middlewares: Middleware[]) => middlewares.flat();

export const createOrderHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(orderValidator) as Middleware[]),
	);

	router.post("/:userId", ...middlewares, orderController.createOrder);
};

export const updateOrderStatusHandler = (router: Router) => {
	router.put("/:id", orderController.changeOrderStatusHandler);
};

export const getAllOrdersHandler = (router: Router) => {
	router.get("/:userId", orderController.orderListingHandler);
};
