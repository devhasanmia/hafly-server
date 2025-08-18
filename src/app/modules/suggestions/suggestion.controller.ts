import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { IAuthUser } from "../../interfaces/auth.interface";
import { SuggestionServices } from "./suggestion.service";
import { sendResponse } from "../../utils/sendResponse";

const suggestions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser = req.user;
    const data = await SuggestionServices.suggestions(authenticatedUser as IAuthUser);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Suggestions fetched successfully",
        data,
    });
});



export const SuggestionController = {
    suggestions
}