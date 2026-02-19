import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const createValidationMiddlewares = (
	validator: ValidationChain | ValidationChain[],
) => {
	let middlewares = [];

	if (validator) {
		const checkValidation = (
			req: Request,
			res: Response,
			next: NextFunction,
		) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					success: false,
					errors: errors.array(),
				});
			}
			return next();
		};
		middlewares.push(validator, checkValidation);
	}

	return middlewares;
};
