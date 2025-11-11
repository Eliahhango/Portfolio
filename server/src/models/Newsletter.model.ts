import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  token: string;
  confirmed: boolean;
  confirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>({
  email: { type: String, required: true, unique: true, index: true },
  token: { type: String, required: true, index: true },
  confirmed: { type: Boolean, default: false },
  confirmedAt: { type: Date }
}, { timestamps: true });

const Newsletter = mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
export default Newsletter;


