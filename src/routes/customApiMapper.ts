import { Router } from "express";
import * as userHandler from "../modules/user";
import * as orderHandler from "../modules/order";
import * as productHandler from "../modules/product";
import * as clientHandler from "../modules/client";
import { REQUEST_TYPES } from "../core/requestTypes";

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
	product: {
		methods: [
			{
				type: REQUEST_TYPES.CREATE,
				handler: productHandler.createProductHandler,
			},
			{
				type: REQUEST_TYPES.FETCH_ALL,
				handler: productHandler.getAllProductsHandler,
			},
		],
	},
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
			{
				type: REQUEST_TYPES.FETCH_ALL,
				handler: orderHandler.testEmailHandler,
			},
		],
	},
	client: {
		methods: [
			{
				type: REQUEST_TYPES.CREATE,
				handler: clientHandler.createClientHandler,
			},
			{
				type: REQUEST_TYPES.CREATE,
				handler: clientHandler.createBulkClientHandler,
			},

			{
				type: REQUEST_TYPES.FETCH_ALL,
				handler: clientHandler.getClientListingHandler,
			},
			{
				type: REQUEST_TYPES.CREATE,
				handler: clientHandler.createAssociateUserHandler,
			},
			{
				type: REQUEST_TYPES.UPDATE,
				handler: clientHandler.updateAssociateUserHandler,
			},
			{
				type: REQUEST_TYPES.FETCH_ALL,
				handler: clientHandler.getAllAssociateUserHandler,
			},
		],
	},
};
