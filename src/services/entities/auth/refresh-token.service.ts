import { Utils } from "../../../utils/index.";
import { Errors } from "../../../errors";
import { User } from "../../../models";

export interface RefreshTokenInput {
  refreshToken: string;
}

export const refreshTokenService = async (input: RefreshTokenInput) => {
  const { refreshToken } = input;

  if (!refreshToken)
    throw new Errors.UnauthorizedError("Refresh token is required");

  const payload = Utils.Tokens.verifyRefreshToken(refreshToken);

  const user = await User.findById(payload.id);
  if (!user || !user.refreshToken) {
    throw new Errors.UnauthorizedError("Invalid refresh token");
  }

  if (user.refreshToken !== refreshToken) {
    throw new Errors.UnauthorizedError("Refresh token mismatch");
  }

  if (!user.isEmailVerified) {
    throw new Errors.UnauthorizedError("Email not verified");
  }

  const newAccessToken = Utils.Tokens.generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const newRefreshToken = Utils.Tokens.generateRefreshToken({
    id: user._id,
    role: user.role,
  });

  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
