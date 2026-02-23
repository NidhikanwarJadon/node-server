import { Router } from "express";
import { createValidationMiddlewares } from "../middlewares/validation";
import { authValidator } from "../modules/auth/auth.validator";
import { loginHandler } from "../modules/auth/auth.controller";

interface ApiDependencies {
	router: Router;
}

const AuthRouter = (deps: ApiDependencies): Router => {
	const router: Router = deps.router;

	const loginMiddlewares = createValidationMiddlewares(authValidator);

	router.post("/login", ...loginMiddlewares, loginHandler);

	return router;
};

export default AuthRouter;

export const authRouter = AuthRouter({ router: Router() });
