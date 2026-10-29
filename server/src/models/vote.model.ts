import { Schema, model, Document, Types } from 'mongoose';

export interface IVote extends Document {
  _id: Types.ObjectId;
  surveyId: Types.ObjectId;
  candidateId: Types.ObjectId;
  hashedUserId: string;
  opinionId: string;
  value: number;
  archivedAt?: Date;
  createdAt: Date;
}

const voteSchema = new Schema<IVote>(
  {
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true, index: true },
    candidateId: { type: Schema.Types.ObjectId, required: true, index: true },
    hashedUserId: { type: String, required: true },
    opinionId: { type: String, required: true },
    value: { type: Number, required: true },
    archivedAt: { type: Date, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

voteSchema.index({ surveyId: 1, candidateId: 1 });
voteSchema.index({ surveyId: 1, hashedUserId: 1 });

export const Vote = model<IVote>('Vote', voteSchema);
