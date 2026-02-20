import { NextFunction } from "express";

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const composeMiddlewares = (...middlewares: Middleware[]) =>
	middlewares.flat();
