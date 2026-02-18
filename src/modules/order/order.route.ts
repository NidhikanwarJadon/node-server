import { Router } from "express";
import {
	changeOrderStatusHandler,
	createOrderHander,
	orderListingHandler,
	testEmailController,
} from "./order.controller";

const orderRouter = Router();

orderRouter.get("/test-email", testEmailController);
orderRouter.get("/:userId", orderListingHandler);
orderRouter.post("/:userId", createOrderHander);
orderRouter.put("/:id", changeOrderStatusHandler);

export default orderRouter;
