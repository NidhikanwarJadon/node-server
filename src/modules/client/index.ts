import { Router } from "express";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";
import { createValidationMiddlewares } from "../../middlewares/validation";
import { clientValidator } from "./client.validator";
import { authenticateUser } from "../../middlewares/authMiddleware";
import * as clientController from "./client.controller";

export const createClientHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(clientValidator) as Middleware[]),
		authenticateUser,
	);

	router.post("/", ...middlewares, clientController.createClientController);
};
