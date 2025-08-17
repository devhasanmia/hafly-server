import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import config from "../config";
import User from "../modules/user/user.model";
import AppError from "../errorHelpers/AppError";
import { StatusCode } from "./statusCode";

export const createUserToken = (user: IUser & { _id: string }) => {
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role,
    };
    const accessToken = generateToken(
        jwtPayload as JwtPayload,
        config.jwt.secret,
        config.jwt.expires_in
    );
    const refreshToken = generateToken(
        jwtPayload as JwtPayload,
        config.jwt.refresh_secret,
        config.jwt.refresh_expires_in
    );
    return {
        accessToken,
        refreshToken
    }
};

export const refreshAccessToken = async (refreshToken: string) => {
    const varifiedToken = verifyToken(
        refreshToken,
        config.jwt.refresh_secret
    ) as JwtPayload;
    const isUserExist = await User.findOne({ email: varifiedToken.email });
    if (!isUserExist) {
        throw new AppError(StatusCode.BadRequest, "User does Not Exist");
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
    };
    const accessToken = generateToken(
        jwtPayload,
        config.jwt.secret,
        config.jwt.expires_in
    );
    return accessToken
}