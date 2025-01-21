import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  booking: Schema.Types.ObjectId;
  client: Schema.Types.ObjectId;
  photographer: Schema.Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  photos?: {
    url: string;
    caption?: string;
  }[];
  likes: number;
  status: 'published' | 'draft' | 'pending' | 'reported';
  response?: {
    content: string;
    date: Date;
  };
  flags?: {
    reason: string;
    reportedBy: Schema.Types.ObjectId;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    photographer: { type: Schema.Types.ObjectId, ref: 'Photographer', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    content: { type: String, required: true },
    photos: [{
      url: { type: String, required: true },
      caption: String,
    }],
    likes: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['published', 'draft', 'pending', 'reported'],
      default: 'pending',
    },
    response: {
      content: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
    flags: [{
      reason: { type: String, required: true },
      reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      date: { type: Date, default: Date.now },
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ReviewSchema.index({ photographer: 1, status: 1 });
ReviewSchema.index({ client: 1, status: 1 });
ReviewSchema.index({ booking: 1 }, { unique: true });
ReviewSchema.index({ rating: -1 });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
