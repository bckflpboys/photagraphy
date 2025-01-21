import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth, withValidation } from '@/lib/api-middlewares';
import { Photographer } from '@/models';
import { photographerSchema } from '@/lib/validations/photographer';

// GET /api/photographers
export const GET = withErrorHandler(
  withDB(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    
    // Build query based on search parameters
    const query: any = {};
    
    // Filter by specialty
    const specialty = searchParams.get('specialty');
    if (specialty) {
      query.specialties = specialty;
    }
    
    // Filter by price range
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      query.priceRange = {};
      if (minPrice) query.priceRange.min = { $gte: parseInt(minPrice) };
      if (maxPrice) query.priceRange.max = { $lte: parseInt(maxPrice) };
    }
    
    // Filter by availability
    const status = searchParams.get('status');
    if (status) {
      query['availability.status'] = status;
    }
    
    // Location-based search
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius'); // in kilometers
    if (lat && lng && radius) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius) * 1000, // convert to meters
        },
      };
    }
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Get photographers
    const photographers = await Photographer.find(query)
      .skip(skip)
      .limit(limit)
      .select('-settings') // Exclude sensitive data
      .lean();
    
    // Get total count for pagination
    const total = await Photographer.countDocuments(query);
    
    return NextResponse.json({
      photographers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  })
);

// POST /api/photographers
export const POST = withErrorHandler(
  withDB(
    withAuth(
      withValidation(photographerSchema, async (req: NextRequest) => {
        const body = await req.json();
        
        // Create new photographer
        const photographer = await Photographer.create({
          ...body,
          type: 'photographer',
          location: {
            type: 'Point',
            coordinates: body.location.coordinates,
            address: body.location.address,
          },
        });
        
        return NextResponse.json(photographer, { status: 201 });
      })
    )
  )
);
