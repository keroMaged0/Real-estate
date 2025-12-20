import { compare, hash } from "bcryptjs";
import { env } from "../config/env";

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> => {
  const pepper = env.JWT_SECRET;
  return hash(password + pepper, SALT_ROUNDS);
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const pepper = env.JWT_SECRET;
  return compare(password + pepper, hashedPassword);
};

export const Bcrypt = {
  hashPassword,
  comparePassword,
};
