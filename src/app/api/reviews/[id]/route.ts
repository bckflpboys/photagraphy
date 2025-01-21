// Temporarily disabled API route
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force dynamic to ensure proper routing
export const dynamic = 'force-dynamic';

// Return 404 for all methods while API is disabled
export async function GET() {
  return new Response(null, { status: 404 });
}

export async function PATCH() {
  return new Response(null, { status: 404 });
}

export async function DELETE() {
  return new Response(null, { status: 404 });
}
