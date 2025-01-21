import { NextResponse } from 'next/server';
import type { Session } from '../../models/Session';

export async function GET() {
  // TODO: Replace with actual database query
  const mockActiveSessions: Session[] = [
    {
      id: '1',
      photographerId: 'photo1',
      photographerName: 'John Doe',
      startTime: new Date(Date.now() - 30 * 60000), // Started 30 mins ago
      endTime: new Date(Date.now() + 60 * 60000),   // Ends in 1 hour
      location: 'Central Park, New York',
      price: 200,
      isShareable: true,
      maxClients: 3,
      currentClients: [
        {
          id: 'client1',
          name: 'Alice Smith',
          email: 'alice@example.com',
          sharePreference: true,
          priceShare: 100,
          bookingTime: new Date(Date.now() - 35 * 60000),
        }
      ],
      status: 'active'
    },
    {
      id: '2',
      photographerId: 'photo2',
      photographerName: 'Jane Smith',
      startTime: new Date(Date.now() - 15 * 60000), // Started 15 mins ago
      endTime: new Date(Date.now() + 105 * 60000),  // Ends in 1:45 hours
      location: 'Brooklyn Bridge',
      price: 300,
      isShareable: true,
      maxClients: 2,
      currentClients: [
        {
          id: 'client2',
          name: 'Bob Johnson',
          email: 'bob@example.com',
          sharePreference: true,
          priceShare: 150,
          bookingTime: new Date(Date.now() - 20 * 60000),
        }
      ],
      status: 'active'
    }
  ];

  return NextResponse.json(mockActiveSessions);
}
