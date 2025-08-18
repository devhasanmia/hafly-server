import { IAuthUser } from "../../interfaces/auth.interface";
import User from "../user/user.model";

const suggestions = async (authenticatedUser: IAuthUser) => {
  try {
    const result = await User.find({
      _id: { $ne: authenticatedUser.userId },
    }).select("-password");
    return result;
  } catch (error) {
    throw error;
  }
};

export const SuggestionServices = {
    suggestions
}


