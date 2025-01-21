import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth, withValidation } from '@/lib/api-middlewares';
import { Booking, Photographer } from '@/models';
import { bookingSchema } from '@/lib/validations/booking';

// GET /api/bookings
export const GET = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest) => {
      const { searchParams } = new URL(req.url);
      
      // Build query based on search parameters
      const query: any = {};
      
      // Filter by client or photographer
      const client = searchParams.get('client');
      const photographer = searchParams.get('photographer');
      if (client) query.client = client;
      if (photographer) query.photographer = photographer;
      
      // Filter by status
      const status = searchParams.get('status');
      if (status) query.status = status;
      
      // Filter by date range
      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');
      if (startDate || endDate) {
        query['dateTime.start'] = {};
        if (startDate) query['dateTime.start'].$gte = new Date(startDate);
        if (endDate) query['dateTime.start'].$lte = new Date(endDate);
      }
      
      // Pagination
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;
      
      // Get bookings
      const bookings = await Booking.find(query)
        .skip(skip)
        .limit(limit)
        .populate('photographer', 'name avatar')
        .populate('client', 'name avatar')
        .lean();
      
      // Get total count for pagination
      const total = await Booking.countDocuments(query);
      
      return NextResponse.json({
        bookings,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    })
  )
);

// POST /api/bookings
export const POST = withErrorHandler(
  withDB(
    withAuth(
      withValidation(bookingSchema, async (req: NextRequest) => {
        const body = await req.json();
        
        // Check photographer availability
        const photographer = await Photographer.findById(body.photographer);
        if (!photographer) {
          return NextResponse.json(
            { error: 'Photographer not found' },
            { status: 404 }
          );
        }
        
        // TODO: Check if the time slot is available
        
        // Create booking
        const booking = await Booking.create({
          ...body,
          status: 'pending',
          location: {
            type: 'Point',
            coordinates: body.location.coordinates,
            address: body.location.address,
          },
          payment: {
            status: 'pending',
            amount: body.service.price,
            currency: body.service.currency,
          },
        });
        
        // Populate photographer and client details
        await booking.populate('photographer', 'name avatar');
        await booking.populate('client', 'name avatar');
        
        return NextResponse.json(booking, { status: 201 });
      })
    )
  )
);
