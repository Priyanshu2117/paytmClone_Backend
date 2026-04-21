import { JWT_SECRET } from "../config.js";
import { errorResponse } from "../utils/response.js";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next) => {
    //retrieve authHeader from req
    const authHeader = req.headers.authorization;

    //check if authError exist or start with Bearer
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return errorResponse({
            res,
            statusCode: 403,
            errorCode: "AUTHORIZATION_FAILED",
            message: "Missing Auth token"
        })
    }

    //extract token from auth header
    const token = authHeader.split(' ')[1];

    //decode the token and verify it with JWT_SECRET
    try {
    
        const decodedToken = jwt.verify(token, JWT_SECRET);
        if(decodedToken){
            //add the decoded userid in the request
            req.userId = decodedToken.userId;
            next();
        } else{
            return errorResponse({
                res,
                statusCode: 403,
                errorCode: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong"
            })
        }
        
    } catch (error) {

        return errorResponse({
            res,
            statusCode: 403,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong"
        })
    }

}