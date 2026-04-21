import express from 'express';
import { validateSignin, validateSignup, validateUpdateUser } from '../validations/userValidations.js';
import { fetchUsers, signInController, signUpController, updateUserDetailsController } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post("/signUp", validateSignup, signUpController);

router.post('/signIn',validateSignin, signInController);

router.put("/update", authMiddleware, validateUpdateUser, updateUserDetailsController)

//route to get filterable data from db
//hints: 
// https://stackoverflow.com/quations/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
// https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like

router.get("/bulk", authMiddleware,fetchUsers);



export default router