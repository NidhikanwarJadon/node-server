import { Router } from "express";
import { REQUEST_TYPES } from "./requestTypes";
import { createUserHandler, getUsersHandler } from "../modules/user";

interface ApiMethod<T extends Document = Document> {
	type: string;
	handler?: (router: Router, validator?: any) => void;
	validator?: any;
}

interface CustomApiMapper {
	[key: string]: {
		methods: ApiMethod[];
	};
}

export const customApiMapper: CustomApiMapper = {
	user: {
		methods: [
			{
				type: REQUEST_TYPES.CREATE,
				handler: createUserHandler,
			},
			{
				type: REQUEST_TYPES.FETCH_ALL,
				handler: getUsersHandler,
			},
		],
	},
	products: { methods: [] },
	orders: { methods: [] },
};
