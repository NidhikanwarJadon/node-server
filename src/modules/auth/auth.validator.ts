import { checkSchema } from "express-validator";

export const authValidator = checkSchema({
	email: {
		in: ["body"],
		notEmpty: { errorMessage: "Email is required" },
	},
	password: {
		in: ["body"],
		notEmpty: { errorMessage: "Password is required" },
	},
});
