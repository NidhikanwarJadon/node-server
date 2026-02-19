import { Router } from "express";
import { REQUEST_TYPES } from "./requestTypes";
import * as userHandler from "../modules/user";
import * as orderHandler from "../modules/order";

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
				handler: userHandler.createUserHandler,
			},
			{
				type: REQUEST_TYPES.FETCH_ALL,
				handler: userHandler.getUsersHandler,
			},
			{
				type: REQUEST_TYPES.FETCH_ONE,
				handler: userHandler.getUserByIdHandler,
			},
			{
				type: REQUEST_TYPES.UPDATE,
				handler: userHandler.updateUserHandler,
			},
			{
				type: REQUEST_TYPES.DELETE,
				handler: userHandler.deleteUserHandler,
			},
		],
	},
	products: { methods: [] },
	order: {
		methods: [
			{
				type: REQUEST_TYPES.CREATE,
				handler: orderHandler.createOrderHandler,
			},
			{
				type: REQUEST_TYPES.UPDATE,
				handler: orderHandler.updateOrderStatusHandler,
			},
			{
				type: REQUEST_TYPES.FETCH_ALL,
				handler: orderHandler.getAllOrdersHandler,
			},
		],
	},
};
