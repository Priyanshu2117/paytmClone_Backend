import z from "zod";
import { errorResponse } from "../utils/response.js";
import { generateZodMessage } from "../utils/common.js";

const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string().min(3, "User should be atleast 3 characters long").max(20, "Username can't be more than 20 characters long"),
    password: z.string()
});

const signinSchema = z.object({
    userName: z.string(),
    password: z.string()
})

const updateUserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()
})

//use middleware factory method : one higher order function -> takes schema, 
                            //  : inner function -> middleware function

const commonValidator = (Schema) =>{
    return (req,res, next) =>{
        try {
            Schema.parse(req.body);
            next();
        } catch (error) {
            return errorResponse({
                res,
                errorCode: "VALIDATION_FAILED",
                message: generateZodMessage(JSON.parse(error.message)),
                statusCode: 400
            })
            
        }
    }
}

const validateSignup = commonValidator(signUpSchema);
const validateSignin = commonValidator(signinSchema);
const validateUpdateUser = commonValidator(updateUserSchema);

export {
    validateSignup,
    validateSignin,
    validateUpdateUser
}
