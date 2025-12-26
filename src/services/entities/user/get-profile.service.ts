import { Errors } from "../../../errors";
import { User } from "../../../models";

export const getProfileService = async (userId: string) => {
  const user = await User.findById(userId).select(
    "-password -refreshToken -emailVerification.code"
  );
  if (!user) throw new Errors.NotFoundError("User not found");

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
};
