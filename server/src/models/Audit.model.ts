import mongoose, { Schema, Document } from 'mongoose';

export interface IAudit extends Document {
  adminId: string;
  adminEmail: string;
  action: string;
  method: string;
  path: string;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuditSchema = new Schema<IAudit>({
  adminId: { type: String, index: true },
  adminEmail: { type: String },
  action: { type: String },
  method: { type: String },
  path: { type: String, index: true },
  ip: { type: String }
}, { timestamps: true });

const Audit = mongoose.model<IAudit>('Audit', AuditSchema);
export default Audit;


