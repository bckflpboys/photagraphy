const mongoose = require('mongoose');
const { Schema, Document } = mongoose;

interface IUser extends Document {
  clerkId: string;
  type: 'client' | 'photographer';
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: {
    type: string;
    coordinates: number[];
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['client', 'photographer'] },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: String,
    phone: String,
    bio: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create geospatial index
UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
