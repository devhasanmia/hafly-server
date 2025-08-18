import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errorHelpers/AppError";
import { generateToken } from "../../utils/jwt";
import { StatusCode } from "../../utils/statusCode";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from "bcrypt";

const register = async (payload: IUser) => {
    try {
        payload.verified = {
            isVerified: false,
            since: undefined,
            expiresAt: undefined
        }
        payload.profile = {
            profilePicture: "",
            coverPhoto: "",
            bio: ""
        }
        payload.status = "unverified";
        payload.role = "user";

        const user = await User.create(payload);
        const data = await User.findById(user._id).select("-password");
        return data;
    } catch (error) {
        throw error;
    }
};


const login = async (payload: Pick<IUser, "email" | "password">) => {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(StatusCode.Unauthorized, "Email Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(StatusCode.Unauthorized, "Password Invalid credentials");
    }
    const jwtPayload = {
        userId: user._id,
        role: user.role,
        name: user.name
    }
    const token = generateToken(jwtPayload as JwtPayload, config.jwt.secret, config.jwt.expires_in);
    const refreshToken = generateToken(jwtPayload, config.jwt.refresh_secret, config.jwt.refresh_expires_in);
    const data = await User.findById(user._id).select("name email");
    return {
        data,
        token,
        refreshToken
    };
};

export const AuthServices = {
    register,
    login
}
