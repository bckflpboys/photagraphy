import { NextResponse } from 'next/server';

interface ActivePhotographer {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  isAvailable: boolean;
  rating: number;
  sessionInfo: {
    startTime: string;
    endTime: string;
    price: number;
    isShareable: boolean;
    currentClients: number;
    maxClients: number;
  } | null;
}

export async function GET() {
  // TODO: Replace with actual database query
  const mockActivePhotographers: ActivePhotographer[] = [
    {
      id: 'p1',
      name: 'John Doe',
      location: {
        lat: -26.2041,
        lng: 28.0473
      },
      isAvailable: true,
      rating: 4.8,
      sessionInfo: {
        startTime: new Date(Date.now() - 30 * 60000).toISOString(), // Started 30 mins ago
        endTime: new Date(Date.now() + 60 * 60000).toISOString(),   // Ends in 1 hour
        price: 200,
        isShareable: true,
        currentClients: 1,
        maxClients: 3
      }
    },
    {
      id: 'p2',
      name: 'Jane Smith',
      location: {
        lat: -26.1929,
        lng: 28.0305
      },
      isAvailable: true,
      rating: 4.9,
      sessionInfo: {
        startTime: new Date(Date.now() - 15 * 60000).toISOString(), // Started 15 mins ago
        endTime: new Date(Date.now() + 105 * 60000).toISOString(),  // Ends in 1:45 hours
        price: 300,
        isShareable: true,
        currentClients: 1,
        maxClients: 2
      }
    },
    {
      id: 'p3',
      name: 'Mike Johnson',
      location: {
        lat: -26.1052,
        lng: 28.0560
      },
      isAvailable: true,
      rating: 4.7,
      sessionInfo: null // Available but no active session
    }
  ];

  return NextResponse.json(mockActivePhotographers);
}
