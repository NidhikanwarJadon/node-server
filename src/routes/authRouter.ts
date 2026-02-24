import { Router } from "express";
import { createValidationMiddlewares } from "../middlewares/validation";
import {
	authValidator,
	forgotValidator,
	resetPasswordValidator,
} from "../modules/auth/auth.validator";
import {
	forgotPasswordHandler,
	loginHandler,
	resetPasswordHandler,
} from "../modules/auth/auth.controller";

interface ApiDependencies {
	router: Router;
}

const AuthRouter = (deps: ApiDependencies): Router => {
	const router: Router = deps.router;

	const loginMiddlewares = createValidationMiddlewares(authValidator);
	const forgotMiddlewares = createValidationMiddlewares(forgotValidator);
	const resetPasswordMiddlewares = createValidationMiddlewares(
		resetPasswordValidator,
	);

	router.post("/login", ...loginMiddlewares, loginHandler);
	router.post("/forgot-password", ...forgotMiddlewares, forgotPasswordHandler);
	router.post(
		"/reset-password",
		...resetPasswordMiddlewares,
		resetPasswordHandler,
	);

	return router;
};

export default AuthRouter;

export const authRouter = AuthRouter({ router: Router() });
