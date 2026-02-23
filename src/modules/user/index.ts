import { Router } from "express";
import { createValidationMiddlewares } from "../../middlewares/validation";
import * as userController from "./user.controller";
import { userValidator } from "./user.validator";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";
import { authenticateUser } from "../../middlewares/authMiddleware";

export const createUserHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(userValidator) as Middleware[]),
		authenticateUser,
	);

	router.post("/", ...(middlewares as any[]), userController.createUser);
};

export const getUsersHandler = (router: Router) => {
	router.get("/", authenticateUser, userController.getAllUsers);
};

export const getUserByIdHandler = (router: Router) => {
	router.get("/:id", authenticateUser, userController.getUserById);
};

export const updateUserHandler = (router: Router) => {
	router.put("/:id", authenticateUser, userController.updateUser);
};

export const deleteUserHandler = (router: Router) => {
	router.delete("/:id", authenticateUser, userController.deleteUser);
};
