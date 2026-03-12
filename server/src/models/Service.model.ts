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
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
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
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IService>('Service', ServiceSchema);

