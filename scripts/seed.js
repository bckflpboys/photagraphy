require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/photography';

// Define schemas
const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    type: { type: String, enum: ['client', 'photographer'], required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: String,
    phone: String,
    bio: String,
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
      address: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const PhotographerSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    type: { type: String, enum: ['client', 'photographer'], required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: String,
    phone: String,
    bio: String,
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
      address: { type: String, required: true },
    },
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
        day: String,
        slots: [{
          start: String,
          end: String,
        }],
      }],
    },
    portfolio: [{
      title: String,
      description: String,
      imageUrl: String,
      category: String,
      tags: [String],
      date: Date,
    }],
  },
  { timestamps: true }
);

const BookingSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', required: true },
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
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
      address: { type: String, required: true },
    },
    clientCount: { type: Number, required: true },
    specialRequests: String,
    payment: {
      status: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const ReviewSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    content: { type: String, required: true },
    photos: [{
      url: { type: String, required: true },
      caption: String,
    }],
    status: {
      type: String,
      enum: ['published', 'draft', 'pending', 'reported'],
      default: 'published',
    },
  },
  { timestamps: true }
);

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const MessageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
    readAt: Date,
  },
  { timestamps: true }
);

const FavoriteSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', required: true },
    notes: String,
  },
  { timestamps: true }
);

const BookingRulesSchema = new mongoose.Schema(
  {
    photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'Photographer', required: true },
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
  { timestamps: true }
);

// Create models
const User = mongoose.model('User', UserSchema);
const Photographer = mongoose.model('Photographer', PhotographerSchema);
const Booking = mongoose.model('Booking', BookingSchema);
const Review = mongoose.model('Review', ReviewSchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);
const Message = mongoose.model('Message', MessageSchema);
const Favorite = mongoose.model('Favorite', FavoriteSchema);
const BookingRules = mongoose.model('BookingRules', BookingRulesSchema);

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Photographer.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      Conversation.deleteMany({}),
      Message.deleteMany({}),
      Favorite.deleteMany({}),
      BookingRules.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create test users (clients)
    const clients = await User.create([
      {
        clerkId: 'client_1',
        type: 'client',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        location: {
          type: 'Point',
          coordinates: [18.4241, -33.9249], // Cape Town
          address: 'Cape Town, South Africa',
        },
      },
      {
        clerkId: 'client_2',
        type: 'client',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        location: {
          type: 'Point',
          coordinates: [18.4241, -33.9249], // Cape Town
          address: 'Cape Town, South Africa',
        },
      },
    ]);
    console.log('Created test clients');

    // Create test photographers
    const photographers = await Photographer.create([
      {
        clerkId: 'photographer_1',
        type: 'photographer',
        name: 'David Williams',
        email: 'david@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        phone: '+27123456789',
        bio: 'Professional photographer specializing in weddings and portraits',
        location: {
          type: 'Point',
          coordinates: [18.4241, -33.9249], // Cape Town
          address: 'Cape Town, South Africa',
        },
        specialties: ['wedding', 'portrait', 'event'],
        experience: 5,
        priceRange: {
          min: 1000,
          max: 5000,
          currency: 'ZAR',
        },
        availability: {
          status: 'available',
          schedule: [
            {
              day: 'monday',
              slots: [{ start: '09:00', end: '17:00' }],
            },
            {
              day: 'tuesday',
              slots: [{ start: '09:00', end: '17:00' }],
            },
            {
              day: 'wednesday',
              slots: [{ start: '09:00', end: '17:00' }],
            },
          ],
        },
        portfolio: [
          {
            title: 'Beach Wedding',
            description: 'Beautiful beach wedding in Camps Bay',
            imageUrl: 'https://example.com/image1.jpg',
            category: 'wedding',
            tags: ['beach', 'sunset', 'wedding'],
            date: new Date(),
          },
        ],
      },
    ]);
    console.log('Created test photographers');

    // Create test bookings
    const bookings = await Booking.create([
      {
        client: clients[0]._id,
        photographer: photographers[0]._id,
        service: {
          name: 'Wedding Photography',
          price: 3000,
          currency: 'ZAR',
          duration: 4,
        },
        status: 'confirmed',
        dateTime: {
          start: new Date('2024-01-15T10:00:00Z'),
          end: new Date('2024-01-15T14:00:00Z'),
        },
        location: {
          type: 'Point',
          coordinates: [18.4241, -33.9249],
          address: 'Camps Bay Beach, Cape Town',
        },
        clientCount: 2,
        payment: {
          status: 'paid',
          amount: 3000,
          currency: 'ZAR',
        },
      },
    ]);
    console.log('Created test bookings');

    // Create test reviews
    await Review.create([
      {
        booking: bookings[0]._id,
        client: clients[0]._id,
        photographer: photographers[0]._id,
        rating: 5,
        title: 'Amazing wedding photos!',
        content: 'David did an amazing job capturing our special day. Highly recommended!',
        status: 'published',
      },
    ]);
    console.log('Created test reviews');

    // Create test conversations and messages
    const conversation = await Conversation.create({
      participants: [clients[0]._id, photographers[0]._id],
      status: 'active',
    });

    await Message.create([
      {
        conversation: conversation._id,
        sender: clients[0]._id,
        receiver: photographers[0]._id,
        content: 'Hi, I\'m interested in booking a wedding photoshoot',
        status: 'read',
        readAt: new Date(),
      },
      {
        conversation: conversation._id,
        sender: photographers[0]._id,
        receiver: clients[0]._id,
        content: 'Hello! I\'d be happy to help. When is your wedding?',
        status: 'sent',
      },
    ]);
    console.log('Created test conversations and messages');

    // Create test favorites
    await Favorite.create([
      {
        client: clients[0]._id,
        photographer: photographers[0]._id,
        notes: 'Love their wedding portfolio',
      },
    ]);
    console.log('Created test favorites');

    // Create test booking rules
    await BookingRules.create({
      photographer: photographers[0]._id,
      advanceBookingDays: 90,
      minNoticeHours: 48,
      maxBookingsPerDay: 2,
      sessionDurations: [
        {
          duration: 1,
          price: 1000,
          description: '1-hour mini session',
        },
        {
          duration: 2,
          price: 1800,
          description: '2-hour standard session',
        },
        {
          duration: 4,
          price: 3000,
          description: '4-hour wedding package',
        },
        {
          duration: 8,
          price: 5000,
          description: 'Full-day wedding coverage',
        },
      ],
      bufferBetweenSessions: 30,
      depositRequired: true,
      depositAmount: {
        type: 'percentage',
        value: 30,
      },
      cancellationPolicy: {
        freeCancellationHours: 72,
        refundPolicy: [
          {
            hours: 48,
            refundPercent: 50,
          },
          {
            hours: 24,
            refundPercent: 25,
          },
        ],
      },
      workingHours: [
        {
          day: 'monday',
          isAvailable: true,
          slots: [{ start: '09:00', end: '17:00' }],
        },
        {
          day: 'tuesday',
          isAvailable: true,
          slots: [{ start: '09:00', end: '17:00' }],
        },
        {
          day: 'wednesday',
          isAvailable: true,
          slots: [{ start: '09:00', end: '17:00' }],
        },
        {
          day: 'thursday',
          isAvailable: true,
          slots: [{ start: '09:00', end: '17:00' }],
        },
        {
          day: 'friday',
          isAvailable: true,
          slots: [{ start: '09:00', end: '17:00' }],
        },
        {
          day: 'saturday',
          isAvailable: true,
          slots: [{ start: '08:00', end: '18:00' }],
        },
        {
          day: 'sunday',
          isAvailable: false,
          slots: [],
        },
      ],
      unavailableDates: [
        {
          date: new Date('2024-12-25'),
          reason: 'Christmas Day',
        },
        {
          date: new Date('2024-12-31'),
          reason: 'New Year\'s Eve',
        },
      ],
      travelPolicy: {
        maxDistance: 100,
        travelFees: [
          {
            distance: 20,
            fee: 200,
          },
          {
            distance: 50,
            fee: 500,
          },
          {
            distance: 100,
            fee: 1000,
          },
        ],
        freeWithinDistance: 10,
      },
      specialDayRates: [
        {
          dayType: 'weekend',
          multiplier: 1.2,
        },
        {
          dayType: 'holiday',
          multiplier: 1.5,
          additionalFee: 500,
        },
        {
          dayType: 'seasonal',
          multiplier: 1.3,
        },
      ],
      groupSizeRules: {
        maxGroupSize: 30,
        additionalPersonFee: 100,
      },
      services: [
        {
          name: 'Wedding Photography',
          description: 'Complete wedding day coverage',
          basePrice: 5000,
          duration: 8,
          maxClients: 2,
          includedItems: [
            'High-resolution digital images',
            'Online gallery',
            'Wedding album',
            'Engagement shoot',
          ],
          addons: [
            {
              name: 'Second Photographer',
              price: 1500,
              description: 'Additional photographer for better coverage',
            },
            {
              name: 'Extra Hours',
              price: 500,
              description: 'Additional hour of coverage',
            },
          ],
        },
        {
          name: 'Portrait Session',
          description: 'Individual or family portrait session',
          basePrice: 1000,
          duration: 1,
          maxClients: 6,
          includedItems: [
            'High-resolution digital images',
            'Online gallery',
            '5 printed photos',
          ],
          addons: [
            {
              name: 'Additional Prints',
              price: 200,
              description: '5 additional printed photos',
            },
            {
              name: 'Location Change',
              price: 300,
              description: 'Add a second location to your shoot',
            },
          ],
        },
      ],
      paymentMethods: [
        {
          type: 'credit_card',
          enabled: true,
          processingFee: 2.9,
        },
        {
          type: 'bank_transfer',
          enabled: true,
        },
        {
          type: 'cash',
          enabled: true,
        },
      ],
    });
    console.log('Created test booking rules');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
