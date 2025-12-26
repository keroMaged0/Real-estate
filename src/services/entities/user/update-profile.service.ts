import { Errors } from "../../../errors";
import { User } from "../../../models";

export interface UpdateProfileInput {
  userId: string;
  name?: string;
  phoneNumber?: string;
}

export const updateProfileService = async (input: UpdateProfileInput) => {
  const { userId, name, phoneNumber } = input;

  const user = await User.findById(userId);
  if (!user) throw new Errors.NotFoundError("User not found");

  if (name) user.name = name;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };
};
