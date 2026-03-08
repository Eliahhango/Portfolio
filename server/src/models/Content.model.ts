import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  key: string; // e.g., 'hero-title', 'about-text', 'contact-email'
  value: string | object;
  type: 'text' | 'html' | 'json';
  section: string; // e.g., 'hero', 'about', 'contact', 'footer'
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'html', 'json'],
    default: 'text',
  },
  section: {
    type: String,
    required: true,
    trim: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IContent>('Content', ContentSchema);

