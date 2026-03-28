import mongoose, { Document, Schema } from 'mongoose';

export interface IAudit extends Document {
  actorId?: string;
  actorEmail?: string;
  action: string;
  target?: string;
  details?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const AuditSchema = new Schema<IAudit>(
  {
    actorId: { type: String, trim: true },
    actorEmail: { type: String, trim: true, lowercase: true },
    action: { type: String, required: true, trim: true, index: true },
    target: { type: String, trim: true },
    details: { type: String, trim: true },
    ip: { type: String, trim: true },
    userAgent: { type: String, trim: true },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

AuditSchema.index({ createdAt: -1 });
AuditSchema.index({ actorEmail: 1, createdAt: -1 });
AuditSchema.index({ action: 1, createdAt: -1 });

const Audit = mongoose.models.Audit || mongoose.model<IAudit>('Audit', AuditSchema);
export default Audit;
