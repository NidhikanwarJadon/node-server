import { NextFunction, Request, Response, Router } from "express";
import { createValidationMiddlewares } from "../../middlewares/validation";
import * as userController from "./user.controller";
import { userValidator } from "./user.validator";
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

const composeMiddlewares = (...middlewares: Middleware[]) => middlewares.flat();

export const createUserHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(userValidator) as Middleware[]),
	);

	router.post("/", ...middlewares, userController.createUser);
};

export const getUsersHandler = (router: Router) => {
	router.get("/", userController.getAllUsers);
};
