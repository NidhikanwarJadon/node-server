import { checkSchema } from "express-validator";

export const productValidator = checkSchema({
	name: { in: ["body"], notEmpty: { errorMessage: "Name is required" } },
	price: {
		in: ["body"],
		isNumeric: true,
		isInt: {
			options: {
				min: 0,
			},
		},
		notEmpty: { errorMessage: "Price is required" },
	},
	isActive: {
		in: ["body"],
		optional: true,
		isBoolean: true,
	},
});
