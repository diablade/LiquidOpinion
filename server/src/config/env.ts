import 'dotenv/config';

function require(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing required env var: ${key}`);
  return v;
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  nodeEnv: optional('NODE_ENV', 'development'),
  port: parseInt(optional('PORT', '3000'), 10),
  mongoUri: optional('MONGO_URI', 'mongodb://localhost:27017/liquidopinion'),
  jwt: {
    secret: optional('JWT_SECRET', 'dev_secret_change_me'),
    expiresIn: optional('JWT_EXPIRES_IN', '7d'),
  },
  admin: {
    email: optional('ADMIN_EMAIL', 'admin@liquidopinion.local'),
    password: optional('ADMIN_PASSWORD', 'Admin1234!'),
    username: optional('ADMIN_USERNAME', 'admin'),
  },
  facebook: {
    appId: optional('FACEBOOK_APP_ID', ''),
    appSecret: optional('FACEBOOK_APP_SECRET', ''),
    callbackUrl: optional('FACEBOOK_CALLBACK_URL', 'http://localhost:3000/api/auth/facebook/callback'),
  },
  archive: {
    cron: optional('ARCHIVE_CRON', '0 2 * * *'),
    defaultDays: parseInt(optional('ARCHIVE_DEFAULT_DAYS', '30'), 10),
  },
} as const;
