import mongoose, { Document, Schema } from 'mongoose';

export interface IAudit extends Document {
  action: string;
  actorEmail?: string;
  target?: string;
  details?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const AuditSchema = new Schema<IAudit>(
  {
    action: { type: String, required: true, trim: true },
    actorEmail: { type: String, trim: true },
    target: { type: String, trim: true },
    details: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

const Audit = mongoose.model<IAudit>('Audit', AuditSchema);
export default Audit;
