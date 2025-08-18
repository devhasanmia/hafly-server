import { IUser } from "../user/user.interface";
import User from "../user/user.model";


const register = async (payload: IUser) => {
    try {
        const data = await User.create(payload);
        return data;
    } catch (error) {
        throw error;
    }
};

export const AuthServices = {
    register
}
