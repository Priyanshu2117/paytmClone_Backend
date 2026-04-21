export const successResponse = ({
    res,
    data = null,
    message = "Success",
    statusCode = 200
}) => {
    return res.status(statusCode).json({
        success: true,
        data,
        message
    });
}

export const errorResponse = ({
    res,
    errorCode= "INTERNAL_SERVER_ERROR",
    message =  "Something went wrong",
    statusCode = 404
}) => {
    return res.status(statusCode).json({
        success: false,
        error:{
            code: errorCode,
            message: message
        }
    })
}