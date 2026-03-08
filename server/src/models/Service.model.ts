import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  category: 'cybersecurity' | 'development' | 'design' | 'consulting';
  features: string[];
  pricing?: {
    startingAt?: number;
    currency?: string;
  };
  isActive: boolean;
  order: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['cybersecurity', 'development', 'design', 'consulting'],
    required: true,
  },
  features: [{
    type: String,
  }],
  pricing: {
    startingAt: Number,
    currency: {
      type: String,
      default: 'USD',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IService>('Service', ServiceSchema);

