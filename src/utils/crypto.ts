import crypto from "crypto";

const hashCode = (code: string) =>
  crypto.createHash("sha256").update(code).digest("hex");

const generateCode = (length: number = 3) => {
  return new Promise<string>((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString("hex").slice(0, length).toUpperCase());
    });
  });
};

export const Crypto = {
  hashCode,
  generateCode,
};
