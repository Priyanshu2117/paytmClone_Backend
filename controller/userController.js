
import { fetchUserDetails, signIn, signUp, updateUser } from "../services/userService.js"
import { errorResponse, successResponse } from "../utils/response.js";

export const signUpController = async (req,res)=>{
    try {
        const result = await signUp(req.body);

        return successResponse({
            res,
            data: result,
            message: "User created successfully",
            statusCode: 200
        })
    } catch (error) {
        return errorResponse({
            res,
            message: error.message,
            statusCode: 400,
            errorCode: "SIGNUP_FAILED"
        })
        
    }
} 

export const signInController = async (req,res)=>{
    try {
        const result = await signIn(req.body);

        return successResponse({
            res,
            data: result,
            message:"Signin successfull",
            statusCode: 200
        })
    } catch (error) {
        return errorResponse({
            res,
            errorCode:"SIGNIN_FAILED",
            statusCode: 400,
            message: error.message
        })
        
    }
}

export const updateUserDetailsController = async (req,res) =>{
    try {
        console.log(req.body);
        const result = await updateUser(req.body, req.userId);
        return successResponse({
            res,
            data: result || {},
            message:"Update successfull",
            statusCode: 200
        })
        
    } catch (error) {
        return errorResponse({
            res,
            errorCode:"UPDATE_FAILED",
            statusCode: 400,
            message: error.message
        })
    }
}

export const fetchUsers = async (req,res) =>{
    try {
        const result = await fetchUserDetails(req);
        
        return successResponse({
            res,
            data: result,
            statusCode: 200,
            message: "Data fetched Successfully"
        })
    } catch (error) {
        return errorResponse({
            res,
            errorCode:"UPDATE_FAILED",
            statusCode: 400,
            message: error.message
        })
    }
}