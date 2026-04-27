import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  description?: string;
  content: string; // markdown
  tags: string[];
  cover?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String },
  content: { type: String, required: true },
  tags: [{ type: String }],
  cover: { type: String },
  published: { type: Boolean, default: false }
}, { timestamps: true });

const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
export default BlogPost;


