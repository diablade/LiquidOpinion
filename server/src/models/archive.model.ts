import { Schema, model, Document, Types } from 'mongoose';

export interface IArchiveRun extends Document {
  _id: Types.ObjectId;
  surveyId: Types.ObjectId;
  votesArchived: number;
  ranAt: Date;
  triggeredBy: 'scheduler' | 'manual';
  operatorId?: Types.ObjectId;
}

const archiveRunSchema = new Schema<IArchiveRun>(
  {
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true, index: true },
    votesArchived: { type: Number, required: true },
    ranAt: { type: Date, default: Date.now },
    triggeredBy: { type: String, enum: ['scheduler', 'manual'], required: true },
    operatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: false },
);

export const ArchiveRun = model<IArchiveRun>('ArchiveRun', archiveRunSchema);
