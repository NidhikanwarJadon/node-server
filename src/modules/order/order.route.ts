import { Router } from "express";
import {
	changeOrderStatusHandler,
	createOrderHander,
	orderListingHandler,
} from "./order.controller";

const orderRouter = Router();

orderRouter.post("/:userId", createOrderHander);
orderRouter.put("/:id", changeOrderStatusHandler);
orderRouter.get("/:userId", orderListingHandler);

export default orderRouter;
