import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth, withValidation } from '@/lib/api-middlewares';
import { Booking } from '@/models';
import { bookingUpdateSchema } from '@/lib/validations/booking';

// GET /api/bookings/[id]
export const GET = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
      const booking = await Booking.findById(params.id)
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
export const PATCH = withErrorHandler(
  withDB(
    withAuth(
      withValidation(bookingUpdateSchema.partial(), async (req: NextRequest, { params }: { params: { id: string } }) => {
        const body = await req.json();

        const booking = await Booking.findByIdAndUpdate(
          params.id,
          { $set: body },
          { new: true, runValidators: true }
        )
          .populate('photographer', 'name avatar')
          .populate('client', 'name avatar');

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
export const DELETE = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
      const booking = await Booking.findByIdAndDelete(params.id);

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: 'Booking deleted successfully' },
        { status: 200 }
      );
    })
  )
);
