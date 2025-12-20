import { StringValue } from "ms";

function getEnvValue(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;

  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
}

export const env = {
  ENVIRONMENT: getEnvValue("ENVIRONMENT", "development"),
  PORT: getEnvValue("PORT", "5000"),
  MONGO_URI: getEnvValue("MONGO_URI", "mongodb://127.0.0.1:27017/real-estate"),
  JWT_SECRET: getEnvValue("JWT_SECRET", "supersecret"),
  frontUrl: getEnvValue("FRONT_URL", "*"),
  token: {
    ACCESS_TOKEN_SECRET: getEnvValue("ACCESS_TOKEN_SECRET", "accesssecret"),
    REFRESH_TOKEN_SECRET: getEnvValue("REFRESH_TOKEN_SECRET", "refreshsecret"),
    ACCESS_TOKEN_EXPIRES_IN: getEnvValue(
      "ACCESS_TOKEN_EXPIRES_IN",
      "15m"
    ) as StringValue,
    REFRESH_TOKEN_EXPIRES_IN: getEnvValue(
      "REFRESH_TOKEN_EXPIRES_IN",
      "7d"
    ) as StringValue,
  },
  MAIL: {
    MAIL_SERVICE: getEnvValue("MAIL_SERVICE", "gmail"),
    MAIL_HOST: getEnvValue("MAIL_HOST", "smtp.gmail.com"),
    MAIL_PORT: Number(getEnvValue("MAIL_PORT", "587")),
    MAIL_USER: getEnvValue("MAIL_USER", "your_email@gmail.com"),
    MAIL_PASS: getEnvValue("MAIL_PASS", "your_app_password"),
  },
};
