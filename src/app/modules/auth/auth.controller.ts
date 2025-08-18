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
const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await AuthServices.login(req.body);
    res.cookie("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    }); // 30 days
    // refresh token in httpOnly cookie
    res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "You have successfully logged in!",
        data: data
    });
});


export const AuthController = {
    register,
    login
};
