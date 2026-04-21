import { getBalance, transferMoney } from "../services/accountServices.js";
import { errorResponse, successResponse } from "../utils/response.js";


export const getBalanceController = async (req,res) =>{
    try {
        const result = await getBalance(req.userId); 

        return successResponse({
            res,
            data: result,
            statusCode: 200,
            message: "Balance Fetched Successfully.."
        })
    } catch (error) {
        return errorResponse({
            res,
            errorCode: "INTERNAL_SERVER_ERROR",
            statusCode: 400,
            message: "Something Went Wrong.."
        })
        
    }
    
}

export const transferMoneyController = async(req,res) =>{

    try {
        const result = await transferMoney(req.body, req.userId);
        return successResponse({
            res,
            data: result,
            message : "Money transferred successfully",
            statusCode: 200
        })
    } catch (error) {
        return errorResponse({
            res,
            errorCode: "TRANSACTION_FAILED",
            message: error.message,
            statusCode: 400
        })
        
    }


}