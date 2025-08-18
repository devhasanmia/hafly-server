import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await AuthServices.register(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "You have successfully registered!",
        data,
    });
});

export const AuthController = {
    register
};
