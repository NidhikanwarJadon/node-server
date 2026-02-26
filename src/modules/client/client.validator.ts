import { checkSchema } from "express-validator";

export const clientValidator = checkSchema({
	name: {
		in: ["body"],
		notEmpty: { errorMessage: "Name is required" },
	},
	email: {
		in: ["body"],
		notEmpty: { errorMessage: "Email is required" },
		isEmail: { errorMessage: "Invalid email format" },
	},
});
