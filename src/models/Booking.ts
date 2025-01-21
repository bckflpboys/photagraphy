import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  client: Schema.Types.ObjectId;
  photographer: Schema.Types.ObjectId;
  service: {
    name: string;
    price: number;
    currency: string;
    duration: number;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  dateTime: {
    start: Date;
    end: Date;
  };
  location: {
    type: string;
    coordinates: number[];
    address: string;
  };
  clientCount?: number;
  payment?: {
    status: 'pending' | 'paid' | 'refunded';
    amount: number;
    currency: string;
  };
}

const BookingSchema = new Schema<IBooking>(
  {
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    photographer: { type: Schema.Types.ObjectId, ref: 'Photographer', required: true },
    service: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      currency: { type: String, required: true },
      duration: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    dateTime: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true },
      address: { type: String, required: true },
    },
    clientCount: { type: Number },
    payment: {
      status: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending',
      },
      amount: { type: Number },
      currency: { type: String },
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
BookingSchema.index({ client: 1, status: 1 });
BookingSchema.index({ photographer: 1, status: 1 });
BookingSchema.index({ 'dateTime.start': 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ location: '2dsphere' });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
