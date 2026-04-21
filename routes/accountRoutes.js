import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getBalanceController, transferMoneyController } from "../controller/accountController.js";

const router = express.Router();

router.get("/balance", authMiddleware, getBalanceController)
router.post("/transfer", authMiddleware, transferMoneyController)


export default router;