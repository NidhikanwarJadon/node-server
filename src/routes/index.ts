import { Router } from "express";
import fileRouter from "../modules/file/file.route";
import userRouter from "../modules/user/user.route";
import orderRouter from "../modules/order/order.route";
import productRouter from "../modules/product/product.route";

const router = Router();

router.use("/", fileRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);

export default router;
