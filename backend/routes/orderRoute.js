import express from 'express';
import { listOrders, placeOrder, placeOrderCod, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/status", updateStatus);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/placecod", authMiddleware, placeOrderCod);

export default orderRouter;