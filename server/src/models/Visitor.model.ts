import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
  ip: string;
  userAgent: string;
  referer?: string;
  path: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  isNewVisitor: boolean;
  sessionId: string;
  visitedAt: Date;
  duration?: number; // in seconds
}

const VisitorSchema = new Schema<IVisitor>({
  ip: { type: String, required: true, index: true },
  userAgent: { type: String, required: true },
  referer: { type: String },
  path: { type: String, required: true, index: true },
  country: { type: String },
  city: { type: String },
  device: { type: String },
  browser: { type: String },
  os: { type: String },
  isNewVisitor: { type: Boolean, default: true },
  sessionId: { type: String, required: true, index: true },
  visitedAt: { type: Date, default: Date.now, index: true },
  duration: { type: Number },
}, {
  timestamps: true,
});

// Indexes for better query performance
VisitorSchema.index({ visitedAt: -1 });
VisitorSchema.index({ ip: 1, visitedAt: -1 });
VisitorSchema.index({ sessionId: 1 });

const Visitor = mongoose.model<IVisitor>('Visitor', VisitorSchema);
export default Visitor;

