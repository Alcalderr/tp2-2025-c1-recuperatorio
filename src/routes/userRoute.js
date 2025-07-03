import express from "express";
import { getAllUsers, getUser, registerUserController, loginUserController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUser);

export default router;
