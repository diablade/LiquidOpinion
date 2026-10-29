import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User, IUser } from '../../models/user.model';
import { env } from '../../config/env';

const SALT_ROUNDS = 12;

export interface AuthTokens {
  accessToken: string;
}

function signToken(userId: string, role: string): string {
  return jwt.sign({ sub: userId, role }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn as jwt.SignOptions['expiresIn'],
  });
}

export async function signup(data: {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}): Promise<{ user: IUser; tokens: AuthTokens }> {
  const existing = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] });
  if (existing) {
    const field = existing.email === data.email ? 'email' : 'username';
    throw Object.assign(new Error(`${field} already taken`), { status: 409 });
  }
  const password = await bcrypt.hash(data.password, SALT_ROUNDS);
  const user = await User.create({ ...data, password, emailVerified: false });
  return { user, tokens: { accessToken: signToken(user.id, user.role) } };
}

export async function loginWithCredentials(email: string, password: string): Promise<{ user: IUser; tokens: AuthTokens }> {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !user.password) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  return { user, tokens: { accessToken: signToken(user.id, user.role) } };
}

export function tokenForOAuthUser(user: IUser): AuthTokens {
  return { accessToken: signToken(user.id, user.role) };
}

export async function seedAdmin(): Promise<void> {
  const existing = await User.findOne({ email: env.admin.email });
  if (existing) return;
  const password = await bcrypt.hash(env.admin.password, SALT_ROUNDS);
  await User.create({
    email: env.admin.email,
    username: env.admin.username,
    password,
    role: 'ADMIN',
    emailVerified: true,
  });
  console.log(`Admin seeded: ${env.admin.email}`);
}
