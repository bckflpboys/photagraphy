// const mongoose = require('mongoose');
// const { User, Photographer, Booking, Review, Message, Conversation, Favorite } = require('../src/models');

// // MongoDB connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/photography';

// async function seed() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(MONGODB_URI);
//     console.log('Connected to MongoDB');

//     // Clear existing data
//     await Promise.all([
//       User.deleteMany({}),
//       Photographer.deleteMany({}),
//       Booking.deleteMany({}),
//       Review.deleteMany({}),
//       Message.deleteMany({}),
//       Conversation.deleteMany({}),
//       Favorite.deleteMany({}),
//     ]);
//     console.log('Cleared existing data');

//     // Create test users (clients)
//     const clients = await User.create([
//       {
//         clerkId: 'client_1',
//         type: 'client',
//         name: 'John Doe',
//         email: 'john@example.com',
//         avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//         location: {
//           type: 'Point',
//           coordinates: [18.4241, -33.9249], // Cape Town
//           address: 'Cape Town, South Africa',
//         },
//       },
//       {
//         clerkId: 'client_2',
//         type: 'client',
//         name: 'Jane Smith',
//         email: 'jane@example.com',
//         avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
//         location: {
//           type: 'Point',
//           coordinates: [18.4241, -33.9249], // Cape Town
//           address: 'Cape Town, South Africa',
//         },
//       },
//     ]);
//     console.log('Created test clients');

//     // Create test photographers
//     const photographers = await Photographer.create([
//       {
//         clerkId: 'photographer_1',
//         type: 'photographer',
//         name: 'David Williams',
//         email: 'david@example.com',
//         avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
//         phone: '+27123456789',
//         bio: 'Professional photographer specializing in weddings and portraits',
//         location: {
//           type: 'Point',
//           coordinates: [18.4241, -33.9249], // Cape Town
//           address: 'Cape Town, South Africa',
//         },
//         specialties: ['wedding', 'portrait', 'event'],
//         experience: 5,
//         priceRange: {
//           min: 1000,
//           max: 5000,
//           currency: 'ZAR',
//         },
//         availability: {
//           status: 'available',
//           schedule: [
//             {
//               day: 'monday',
//               slots: [{ start: '09:00', end: '17:00' }],
//             },
//             {
//               day: 'tuesday',
//               slots: [{ start: '09:00', end: '17:00' }],
//             },
//             {
//               day: 'wednesday',
//               slots: [{ start: '09:00', end: '17:00' }],
//             },
//           ],
//         },
//         portfolio: [
//           {
//             title: 'Beach Wedding',
//             description: 'Beautiful beach wedding in Camps Bay',
//             imageUrl: 'https://example.com/image1.jpg',
//             category: 'wedding',
//             tags: ['beach', 'sunset', 'wedding'],
//             date: new Date(),
//           },
//         ],
//       },
//       {
//         clerkId: 'photographer_2',
//         type: 'photographer',
//         name: 'Sarah Johnson',
//         email: 'sarah@example.com',
//         avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
//         phone: '+27123456790',
//         bio: 'Fashion and portrait photographer',
//         location: {
//           type: 'Point',
//           coordinates: [18.4241, -33.9249], // Cape Town
//           address: 'Cape Town, South Africa',
//         },
//         specialties: ['fashion', 'portrait'],
//         experience: 3,
//         priceRange: {
//           min: 800,
//           max: 3000,
//           currency: 'ZAR',
//         },
//         availability: {
//           status: 'available',
//           schedule: [
//             {
//               day: 'thursday',
//               slots: [{ start: '09:00', end: '17:00' }],
//             },
//             {
//               day: 'friday',
//               slots: [{ start: '09:00', end: '17:00' }],
//             },
//             {
//               day: 'saturday',
//               slots: [{ start: '10:00', end: '15:00' }],
//             },
//           ],
//         },
//       },
//     ]);
//     console.log('Created test photographers');

//     // Create test bookings
//     const bookings = await Booking.create([
//       {
//         client: clients[0]._id,
//         photographer: photographers[0]._id,
//         service: {
//           name: 'Wedding Photography',
//           price: 3000,
//           currency: 'ZAR',
//           duration: 4,
//         },
//         status: 'confirmed',
//         dateTime: {
//           start: new Date('2024-01-15T10:00:00Z'),
//           end: new Date('2024-01-15T14:00:00Z'),
//         },
//         location: {
//           type: 'Point',
//           coordinates: [18.4241, -33.9249],
//           address: 'Camps Bay Beach, Cape Town',
//         },
//         clientCount: 2,
//         payment: {
//           status: 'paid',
//           amount: 3000,
//           currency: 'ZAR',
//         },
//       },
//     ]);
//     console.log('Created test bookings');

//     // Create test reviews
//     await Review.create([
//       {
//         booking: bookings[0]._id,
//         client: clients[0]._id,
//         photographer: photographers[0]._id,
//         rating: 5,
//         title: 'Amazing wedding photos!',
//         content: 'David did an amazing job capturing our special day. Highly recommended!',
//         status: 'published',
//       },
//     ]);
//     console.log('Created test reviews');

//     // Create test conversation and messages
//     const conversation = await Conversation.create({
//       participants: [clients[0]._id, photographers[0]._id],
//       status: 'active',
//     });

//     await Message.create([
//       {
//         conversation: conversation._id,
//         sender: clients[0]._id,
//         receiver: photographers[0]._id,
//         content: 'Hi, I\'m interested in booking a wedding photoshoot',
//         status: 'read',
//       },
//       {
//         conversation: conversation._id,
//         sender: photographers[0]._id,
//         receiver: clients[0]._id,
//         content: 'Hello! I\'d be happy to help. When is your wedding?',
//         status: 'read',
//       },
//     ]);
//     console.log('Created test conversation and messages');

//     // Create test favorites
//     await Favorite.create([
//       {
//         client: clients[0]._id,
//         photographer: photographers[0]._id,
//       },
//     ]);
//     console.log('Created test favorites');

//     console.log('Database seeded successfully!');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//   } finally {
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   }
// }

// seed();
