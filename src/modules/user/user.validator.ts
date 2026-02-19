import { checkSchema } from "express-validator";

export const userValidator = checkSchema({
	email: {
		in: ["body"],
		// isString: true,
		notEmpty: { errorMessage: "Email is required" },
	},
	firstName: {
		in: ["body"],
		// isString: true,
		notEmpty: { errorMessage: "FirstName is required" },
	},
	password: {
		in: ["body"],
		// isString: true,
		notEmpty: { errorMessage: "Password is required" },
	},
});
