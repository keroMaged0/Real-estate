import { sign, verify } from "jsonwebtoken";
import { StringValue } from "ms";

import { env } from "../config/env";

interface TokenPayload {
  id: string;
  role: string;
}

const generateAccessToken = (payload: object) => {
  return sign(payload, env.token.ACCESS_TOKEN_SECRET, {
    expiresIn: env.token.ACCESS_TOKEN_EXPIRES_IN as StringValue,
  });
};

const generateRefreshToken = (payload: object) => {
  return sign(payload, env.token.REFRESH_TOKEN_SECRET, {
    expiresIn: env.token.REFRESH_TOKEN_EXPIRES_IN as StringValue,
  });
};

const verifyAccessToken = (token: string) => {
  return verify(token, env.token.ACCESS_TOKEN_SECRET) as TokenPayload;
};

const verifyRefreshToken = (token: string) => {
  return verify(token, env.token.REFRESH_TOKEN_SECRET) as TokenPayload;
};

const isValidToken = (token: string) => {
  try {
    verify(token, env.token.ACCESS_TOKEN_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export const Tokens = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  isValidToken,
};
