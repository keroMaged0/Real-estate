import { Errors } from "../../../errors/index";
import { User } from "../../../models";
import { Utils } from "../../../utils";

export interface SigninInput {
  email: string;
  password: string;
}

export const signinService = async (input: SigninInput) => {
  const { email, password } = input;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Errors.UnauthorizedError("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Errors.UnauthorizedError("Invalid email or password");
  }

  if (!user.isEmailVerified)
    throw new Errors.UnauthorizedError("Please verify your email to signin");

  const accessToken = Utils.Tokens.generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = Utils.Tokens.generateRefreshToken({
    id: user._id,
    role: user.role,
  });

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};
