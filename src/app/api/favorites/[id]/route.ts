// Temporarily disabled API route
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force dynamic to ensure proper routing
export const dynamic = 'force-dynamic';

// Return 404 while API is disabled
export async function DELETE() {
  return new Response(null, { status: 404 });
}
