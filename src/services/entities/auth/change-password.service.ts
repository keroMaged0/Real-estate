import { Errors } from "../../../errors";
import { User } from "../../../models";
import { Utils } from "../../../utils";

export interface ChangePasswordInput {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export const changePasswordService = async (input: ChangePasswordInput) => {
  const { userId, oldPassword, newPassword } = input;

  const user = await User.findById(userId);
  if (!user) {
    throw new Errors.UnauthorizedError("User not found");
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new Errors.BadRequestError("OldPassword password is incorrect");
  }

  const isSamePassword = await Utils.Bcrypt.comparePassword(
    newPassword,
    user.password
  );
  if (isSamePassword) {
    throw new Errors.BadRequestError(
      "New password must be different from current password"
    );
  }

  user.password = newPassword;
  user.password = newPassword;
  await user.save();

  return {
    message: "Password changed successfully",
  };
};
