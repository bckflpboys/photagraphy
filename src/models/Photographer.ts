import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPhotographer extends IUser {
  specialties: string[];
  experience: number;
  equipment?: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  availability: {
    status: 'available' | 'busy' | 'away';
    schedule: {
      day: string;
      slots: {
        start: string;
        end: string;
      }[];
    }[];
    customDates?: {
      date: Date;
      available: boolean;
      slots?: {
        start: string;
        end: string;
      }[];
    }[];
  };
  portfolio: {
    title: string;
    description?: string;
    imageUrl: string;
    category: string;
    tags: string[];
    date: Date;
  }[];
  stats: {
    totalBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalEarnings: number;
    averageRating: number;
    totalReviews: number;
    profileViews: number;
    responseRate: number;
    responseTime: number;
  };
  services: {
    name: string;
    description: string;
    duration: number;
    price: number;
    currency: string;
    maxClients: number;
  }[];
  settings: {
    autoAcceptBookings: boolean;
    advanceBookingDays: number;
    cancellationPolicy: string;
    minNoticeHours: number;
  };
}

const PhotographerSchema = new Schema<IPhotographer>(
  {
    specialties: [{ type: String, required: true }],
    experience: { type: Number, required: true },
    equipment: [String],
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
    },
    availability: {
      status: {
        type: String,
        enum: ['available', 'busy', 'away'],
        default: 'available',
      },
      schedule: [{
        day: {
          type: String,
          enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          required: true,
        },
        slots: [{
          start: { type: String, required: true },
          end: { type: String, required: true },
        }],
      }],
      customDates: [{
        date: { type: Date, required: true },
        available: { type: Boolean, required: true },
        slots: [{
          start: String,
          end: String,
        }],
      }],
    },
    portfolio: [{
      title: { type: String, required: true },
      description: String,
      imageUrl: { type: String, required: true },
      category: { type: String, required: true },
      tags: [String],
      date: { type: Date, default: Date.now },
    }],
    stats: {
      totalBookings: { type: Number, default: 0 },
      completedBookings: { type: Number, default: 0 },
      cancelledBookings: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
      profileViews: { type: Number, default: 0 },
      responseRate: { type: Number, default: 0 },
      responseTime: { type: Number, default: 0 },
    },
    services: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      duration: { type: Number, required: true },
      price: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      maxClients: { type: Number, required: true },
    }],
    settings: {
      autoAcceptBookings: { type: Boolean, default: false },
      advanceBookingDays: { type: Number, default: 30 },
      cancellationPolicy: { type: String, required: true },
      minNoticeHours: { type: Number, default: 24 },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
PhotographerSchema.index({ specialties: 1 });
PhotographerSchema.index({ 'priceRange.min': 1, 'priceRange.max': 1 });
PhotographerSchema.index({ 'availability.status': 1 });
PhotographerSchema.index({ 'stats.averageRating': -1 });

export default mongoose.models.Photographer || 
  mongoose.model<IPhotographer>('Photographer', PhotographerSchema);
