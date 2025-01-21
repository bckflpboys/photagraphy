import mongoose, { Schema, Document } from 'mongoose';

export interface IBookingRules extends Document {
  photographer: Schema.Types.ObjectId;
  advanceBookingDays: number;  // How many days in advance bookings can be made
  minNoticeHours: number;      // Minimum hours notice required for booking
  maxBookingsPerDay: number;   // Maximum number of bookings allowed per day
  sessionDurations: {          // Available session durations
    duration: number;          // in hours
    price: number;
    description: string;
  }[];
  bufferBetweenSessions: number; // Buffer time between sessions in minutes
  depositRequired: boolean;
  depositAmount: {
    type: 'fixed' | 'percentage';
    value: number;
  };
  cancellationPolicy: {
    freeCancellationHours: number;  // Hours before session for free cancellation
    refundPolicy: {
      hours: number;      // Hours before session
      refundPercent: number;  // Percentage of refund
    }[];
  };
  workingHours: {
    day: string;
    isAvailable: boolean;
    slots: {
      start: string;
      end: string;
    }[];
  }[];
  unavailableDates: {
    date: Date;
    reason?: string;
  }[];
  travelPolicy: {
    maxDistance: number;  // Maximum travel distance in kilometers
    travelFees: {
      distance: number;   // Distance in kilometers
      fee: number;       // Fee amount
    }[];
    freeWithinDistance?: number;  // Distance within which travel is free
  };
  specialDayRates: {
    dayType: 'weekend' | 'holiday' | 'seasonal';
    multiplier: number;  // Price multiplier
    additionalFee?: number;  // Additional flat fee
  }[];
  groupSizeRules: {
    maxGroupSize: number;
    additionalPersonFee: number;
  };
  services: {
    name: string;
    description: string;
    basePrice: number;
    duration: number;  // in hours
    maxClients: number;
    includedItems: string[];
    addons: {
      name: string;
      price: number;
      description: string;
    }[];
  }[];
  paymentMethods: {
    type: string;
    enabled: boolean;
    processingFee?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingRulesSchema = new Schema<IBookingRules>(
  {
    photographer: { type: Schema.Types.ObjectId, ref: 'Photographer', required: true },
    advanceBookingDays: { type: Number, required: true, default: 90 },
    minNoticeHours: { type: Number, required: true, default: 24 },
    maxBookingsPerDay: { type: Number, required: true, default: 3 },
    sessionDurations: [{
      duration: { type: Number, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
    }],
    bufferBetweenSessions: { type: Number, required: true, default: 30 },
    depositRequired: { type: Boolean, default: true },
    depositAmount: {
      type: { type: String, enum: ['fixed', 'percentage'], required: true },
      value: { type: Number, required: true },
    },
    cancellationPolicy: {
      freeCancellationHours: { type: Number, required: true },
      refundPolicy: [{
        hours: { type: Number, required: true },
        refundPercent: { type: Number, required: true },
      }],
    },
    workingHours: [{
      day: { 
        type: String, 
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: true 
      },
      isAvailable: { type: Boolean, default: true },
      slots: [{
        start: { type: String, required: true },
        end: { type: String, required: true },
      }],
    }],
    unavailableDates: [{
      date: { type: Date, required: true },
      reason: String,
    }],
    travelPolicy: {
      maxDistance: { type: Number, required: true },
      travelFees: [{
        distance: { type: Number, required: true },
        fee: { type: Number, required: true },
      }],
      freeWithinDistance: Number,
    },
    specialDayRates: [{
      dayType: { 
        type: String, 
        enum: ['weekend', 'holiday', 'seasonal'],
        required: true 
      },
      multiplier: { type: Number, required: true },
      additionalFee: Number,
    }],
    groupSizeRules: {
      maxGroupSize: { type: Number, required: true },
      additionalPersonFee: { type: Number, required: true },
    },
    services: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      basePrice: { type: Number, required: true },
      duration: { type: Number, required: true },
      maxClients: { type: Number, required: true },
      includedItems: [String],
      addons: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
      }],
    }],
    paymentMethods: [{
      type: { type: String, required: true },
      enabled: { type: Boolean, default: true },
      processingFee: Number,
    }],
  },
  {
    timestamps: true,
  }
);

// Ensure one set of rules per photographer
BookingRulesSchema.index({ photographer: 1 }, { unique: true });

export default mongoose.models.BookingRules || 
  mongoose.model<IBookingRules>('BookingRules', BookingRulesSchema);
