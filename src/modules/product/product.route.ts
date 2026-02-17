import { Router } from "express";
import {
	createProductHandler,
	productListingHandler,
} from "./product.controller";

const productRouter = Router();

productRouter.post("/", createProductHandler);
productRouter.get("/", productListingHandler);

export default productRouter;
