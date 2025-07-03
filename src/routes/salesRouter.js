import express from "express";
import { getAllSales, getSale, getSalesByEmail, getSalesTotal, getTopProducts, updateCoupon } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllSales);
router.get("/total", authMiddleware, getSalesTotal);
router.get("/top-products", authMiddleware, getTopProducts);
router.get("/customer/:email", authMiddleware, getSalesByEmail);
router.get("/:id", authMiddleware, getSale);
router.put("/:id/coupon", authMiddleware, updateCoupon);

export default router;
