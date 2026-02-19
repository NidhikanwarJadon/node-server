import { checkSchema } from "express-validator";

export const orderValidator = checkSchema({
	userId: {
		in: ["params"],
		notEmpty: { errorMessage: "User Id is required" },
	},
	items: {
		in: ["body"],
		notEmpty: { errorMessage: "Items are required" },
	},
});
