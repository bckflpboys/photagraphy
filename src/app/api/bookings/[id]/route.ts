// Temporarily disabled API route
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force dynamic to ensure proper routing
export const dynamic = 'force-dynamic';

// Commented out original implementation
/*
import { withDB, withErrorHandler, withAuth, withValidation, ApiHandler } from '@/lib/api-middlewares';
import { Booking } from '@/models';
import { bookingUpdateSchema } from '@/lib/validations/booking';

type RouteParams = { params: { id: string } };

// GET /api/bookings/[id]
export const GET: ApiHandler = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest, context?: RouteParams) => {
      const bookingId = context?.params?.id;
      if (!bookingId) {
        return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
      }

      const booking = await Booking.findById(bookingId)
        .populate('photographer', 'name avatar')
        .populate('client', 'name avatar')
        .lean();

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(booking);
    })
  )
);

// PATCH /api/bookings/[id]
export const PATCH: ApiHandler = withErrorHandler(
  withDB(
    withAuth(
      withValidation(bookingUpdateSchema, async (req: NextRequest, context?: RouteParams) => {
        const bookingId = context?.params?.id;
        if (!bookingId) {
          return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
        }

        const body = await req.json();

        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          { $set: body },
          { new: true }
        )
          .populate('photographer', 'name avatar')
          .populate('client', 'name avatar')
          .lean();

        if (!booking) {
          return NextResponse.json(
            { error: 'Booking not found' },
            { status: 404 }
          );
        }

        return NextResponse.json(booking);
      })
    )
  )
);

// DELETE /api/bookings/[id]
export const DELETE: ApiHandler = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest, context?: RouteParams) => {
      const bookingId = context?.params?.id;
      if (!bookingId) {
        return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
      }

      const booking = await Booking.findByIdAndDelete(bookingId);

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: 'Booking deleted successfully' });
    })
  )
);
*/

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
