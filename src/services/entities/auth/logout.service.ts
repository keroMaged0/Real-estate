import { User } from "../../../models";

export const logoutService = async (refreshToken: string) => {
  if (!refreshToken) return;

  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = undefined;
    await user.save();
  }
};
