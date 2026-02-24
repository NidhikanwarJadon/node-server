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

export const forgotValidator = checkSchema({
	email: {
		in: ["body"],
		notEmpty: { errorMessage: "Email is required" },
	},
});

export const resetPasswordValidator = checkSchema({
	token: {
		in: ["body"],
		notEmpty: { errorMessage: "Token is required" },
	},
	newPassword: {
		in: ["body"],
		notEmpty: { errorMessage: " New Password is required" },
	},
});
