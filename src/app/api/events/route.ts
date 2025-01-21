import { NextResponse } from 'next/server';

// This is a temporary mock data. Replace this with your actual database query
const mockEvents = [
  {
    id: '1',
    title: 'Summer Wedding Photography Workshop',
    date: '2024-07-15',
    location: 'Central Park, New York',
    description: 'Learn the art of wedding photography in this hands-on workshop.',
  },
  {
    id: '2',
    title: 'Nature Photography Exhibition',
    date: '2024-08-20',
    location: 'City Gallery',
    description: 'Showcase of stunning nature photographs from around the world.',
  },
  {
    id: '3',
    title: 'Portrait Photography Masterclass',
    date: '2024-09-10',
    location: 'Photography Studio Downtown',
    description: 'Advanced techniques for capturing compelling portraits.',
  },
];

export async function GET() {
  // In a real application, you would fetch this data from a database
  return NextResponse.json(mockEvents);
}
