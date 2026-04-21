import express from 'express';
import userRouter from './UserRoutes.js'
import accountRouter from "./accountRoutes.js"
 
const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/account",accountRouter)


export default mainRouter;