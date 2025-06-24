import { Schema, model, Document, Types } from 'mongoose';
import slugify from 'slugify';
import crypto from "crypto";


export interface IPost extends Document {
  title: string;
  slug: string,
  content: string;
  headerImage?: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  tags: string[];
  likes: Types.ObjectId[],
  dislikes: Types.ObjectId[]
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    headerImage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: { type: [String], default: [] },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default:[] }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User', default:[] }]
  },
  { timestamps: true }
);


postSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const randomString = crypto.randomBytes(7).toString('hex');
    const slug = `${this.title}-${randomString}`
    this.slug = slugify(slug, { lower: true, strict: true });
  }
  next();
});

const Post = model<IPost>('Post', postSchema);
export default Post;