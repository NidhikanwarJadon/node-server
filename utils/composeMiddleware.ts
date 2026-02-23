import { RequestHandler } from "express";

export type Middleware = RequestHandler;

export const composeMiddlewares = (...middlewares: Middleware[]) =>
	middlewares.flat();
