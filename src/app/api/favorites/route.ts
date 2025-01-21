import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth } from '@/lib/api-middlewares';
import { Favorite } from '@/models';

// GET /api/favorites
export const GET = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest) => {
      const { searchParams } = new URL(req.url);
      
      // Get client ID
      const client = searchParams.get('client');
      if (!client) {
        return NextResponse.json(
          { error: 'Client ID is required' },
          { status: 400 }
        );
      }
      
      // Pagination
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;
      
      // Get favorites
      const favorites = await Favorite.find({ client })
        .skip(skip)
        .limit(limit)
        .populate('photographer', 'name avatar specialties priceRange')
        .sort({ createdAt: -1 })
        .lean();
      
      // Get total count for pagination
      const total = await Favorite.countDocuments({ client });
      
      return NextResponse.json({
        favorites,
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

// POST /api/favorites
export const POST = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest) => {
      const body = await req.json();
      
      // Check if already favorited
      const existing = await Favorite.findOne({
        client: body.client,
        photographer: body.photographer,
      });
      
      if (existing) {
        return NextResponse.json(
          { error: 'Already in favorites' },
          { status: 400 }
        );
      }
      
      // Create favorite
      const favorite = await Favorite.create(body);
      
      // Populate photographer details
      await favorite.populate('photographer', 'name avatar specialties priceRange');
      
      return NextResponse.json(favorite, { status: 201 });
    })
  )
);
