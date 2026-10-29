import bcrypt from 'bcryptjs';
import { User, IUser, UserRole } from '../../models/user.model';
import { Types } from 'mongoose';

const SALT_ROUNDS = 12;

export async function getProfile(userId: string): Promise<IUser> {
  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user;
}

export async function updateProfile(
  userId: string,
  data: Partial<Pick<IUser, 'username' | 'firstName' | 'lastName' | 'description' | 'photo'>>,
): Promise<IUser> {
  if (data.username) {
    const clash = await User.findOne({ username: data.username, _id: { $ne: new Types.ObjectId(userId) } });
    if (clash) throw Object.assign(new Error('username already taken'), { status: 409 });
  }
  const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user;
}

export async function updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
  const user = await User.findById(userId).select('+password');
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  const match = await bcrypt.compare(currentPassword, user.password ?? '');
  if (!match) throw Object.assign(new Error('Current password is wrong'), { status: 403 });
  user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await user.save();
}

export async function listUsers(page: number, limit: number): Promise<{ users: IUser[]; total: number }> {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);
  return { users, total };
}

export async function setRole(userId: string, role: UserRole): Promise<IUser> {
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user;
}

export async function deleteUser(userId: string): Promise<void> {
  const result = await User.findByIdAndDelete(userId);
  if (!result) throw Object.assign(new Error('User not found'), { status: 404 });
}
