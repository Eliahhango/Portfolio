import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  ip?: string;
  userAgent?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  repliedAt?: Date;
  repliedBy?: mongoose.Types.ObjectId;
  notes?: string;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, index: true },
  phone: { type: String, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  ip: { type: String },
  userAgent: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'read', 'replied', 'archived'], 
    default: 'new',
    index: true
  },
  repliedAt: { type: Date },
  repliedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  notes: { type: String },
}, {
  timestamps: true,
});

// Indexes
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ status: 1, createdAt: -1 });
ContactMessageSchema.index({ email: 1, createdAt: -1 });

const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
export default ContactMessage;

