import { Schema, model, Document, Types } from 'mongoose';

export interface Opinion {
  id: string;
  label: string;
  color: string;
  value: number;
}

export interface SurveyMember {
  userId: Types.ObjectId;
  username: string;
  photo?: string;
}

export type SurveyVisibility = 'public' | 'private' | 'unlisted';

export interface ICandidate {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface IArchivePolicy {
  enabled: boolean;
  retentionDays: number;
}

export interface ISurvey extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  creator: SurveyMember;
  slogan?: string;
  description: string;
  themes: string[];
  tags: string[];
  members: SurveyMember[];
  editors: SurveyMember[];
  admins: SurveyMember[];
  candidates: ICandidate[];
  opinions: Opinion[];
  visibility: SurveyVisibility;
  activate: boolean;
  typeOfVote: string;
  reVoteDelayMs: number;
  expireAt?: Date;
  selfDestructAt?: Date;
  archivePolicy: IArchivePolicy;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<SurveyMember>(
  { userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, username: String, photo: String },
  { _id: false },
);

const opinionSchema = new Schema<Opinion>(
  { id: String, label: String, color: String, value: Number },
  { _id: false },
);

const candidateSchema = new Schema<ICandidate>({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  imageUrl: { type: String },
});

const DEFAULT_OPINIONS: Opinion[] = [
  { id: 'rejected', label: 'Rejected', color: '#e53935', value: 0 },
  { id: 'bad', label: 'Bad', color: '#fb8c00', value: 1 },
  { id: 'neutral', label: 'Neutral', color: '#fdd835', value: 2 },
  { id: 'good', label: 'Good', color: '#7cb342', value: 3 },
  { id: 'excellent', label: 'Excellent', color: '#00897b', value: 4 },
];

const surveySchema = new Schema<ISurvey>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    creator: { type: memberSchema, required: true },
    slogan: { type: String, trim: true },
    description: { type: String, required: true },
    themes: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    members: { type: [memberSchema], default: [] },
    editors: { type: [memberSchema], default: [] },
    admins: { type: [memberSchema], required: true },
    candidates: { type: [candidateSchema], default: [] },
    opinions: { type: [opinionSchema], default: DEFAULT_OPINIONS },
    visibility: { type: String, enum: ['public', 'private', 'unlisted'], default: 'public' },
    activate: { type: Boolean, default: false },
    typeOfVote: { type: String, default: 'opinion' },
    reVoteDelayMs: { type: Number, default: 86_400_000 },
    expireAt: { type: Date },
    selfDestructAt: { type: Date },
    archivePolicy: {
      enabled: { type: Boolean, default: true },
      retentionDays: { type: Number, default: 30 },
    },
  },
  { timestamps: true },
);

surveySchema.index({ 'creator.userId': 1 });
surveySchema.index({ visibility: 1, activate: 1 });
surveySchema.index({ tags: 1 });

export const Survey = model<ISurvey>('Survey', surveySchema);
