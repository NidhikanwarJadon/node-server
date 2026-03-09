import { Router } from "express";
import {
	composeMiddlewares,
	Middleware,
} from "../../../utils/composeMiddleware";
import { createValidationMiddlewares } from "../../middlewares/validation";
import { clientValidator } from "./client.validator";
import {
	authenticateUser,
	authenticateUserRole,
} from "../../middlewares/authMiddleware";
import * as clientController from "./client.controller";
import { upload } from "../../middlewares/upload";

export const createClientHandler = (router: Router) => {
	const middlewares = composeMiddlewares(
		...(createValidationMiddlewares(clientValidator) as Middleware[]),
		authenticateUser,
		authenticateUserRole,
	);

	router.post("/", ...middlewares, clientController.createClientController);
};

export const createBulkClientHandler = (router: Router) => {
	router.post(
		"/bulk-upload",
		upload.single("file"),
		authenticateUser,
		authenticateUserRole,
		clientController.bulkCreateClientController,
	);
};

export const getClientListingHandler = (router: Router) => {
	router.get(
		"/",
		authenticateUser,
		authenticateUserRole,
		clientController.getClients,
	);
};

export const createAssociateUserHandler = (router: Router) => {
	router.post(
		"/:id/associate-user",
		authenticateUser,
		authenticateUserRole,
		clientController.createAssociateUser,
	);
};

export const updateAssociateUserHandler = (router: Router) => {
	router.put(
		"/:clientId/associate-user/:userId",
		authenticateUser,
		authenticateUserRole,
		clientController.updateAssociateUser,
	);
};
