import { Router } from "express";
import { createValidationMiddlewares } from "../../middlewares/validation";
import * as userController from "./user.controller";
import { userValidator } from "./user.validator";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";

export const createUserHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(userValidator) as Middleware[]),
	);

	router.post("/", ...(middlewares as any[]), userController.createUser);
};

export const getUsersHandler = (router: Router) => {
	router.get("/", userController.getAllUsers);
};

export const getUserByIdHandler = (router: Router) => {
	router.get("/:id", userController.getUserById);
};

export const updateUserHandler = (router: Router) => {
	router.put("/:id", userController.updateUser);
};

export const deleteUserHandler = (router: Router) => {
	router.delete("/:id", userController.deleteUser);
};
