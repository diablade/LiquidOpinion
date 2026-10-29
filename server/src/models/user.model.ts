import { Schema, model, Document, Types } from 'mongoose';

export type UserRole = 'USER' | 'ADMIN';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  username: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  description?: string;
  photo?: string;
  oauthProvider?: string;
  oauthId?: string;
  emailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    username: { type: String, required: true, unique: true, trim: true, minlength: 2, maxlength: 35 },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    description: { type: String },
    photo: { type: String },
    oauthProvider: { type: String },
    oauthId: { type: String },
    emailVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true },
);

userSchema.index({ oauthProvider: 1, oauthId: 1 }, { sparse: true });

export const User = model<IUser>('User', userSchema);
