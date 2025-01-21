import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  client: Schema.Types.ObjectId;
  photographer: Schema.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    photographer: { type: Schema.Types.ObjectId, ref: 'Photographer', required: true },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Ensure a client can only favorite a photographer once
FavoriteSchema.index({ client: 1, photographer: 1 }, { unique: true });
// Index for querying favorites by client
FavoriteSchema.index({ client: 1, createdAt: -1 });
// Index for querying photographers who favorited a client
FavoriteSchema.index({ photographer: 1, createdAt: -1 });

export default mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);
