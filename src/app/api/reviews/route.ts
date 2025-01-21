import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth, withValidation } from '@/lib/api-middlewares';
import { Review, Photographer } from '@/models';
import { reviewSchema } from '@/lib/validations/review';

// GET /api/reviews
export const GET = withErrorHandler(
  withDB(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    
    // Build query based on search parameters
    const query: any = {};
    
    // Filter by photographer
    const photographer = searchParams.get('photographer');
    if (photographer) query.photographer = photographer;
    
    // Filter by rating
    const minRating = searchParams.get('minRating');
    if (minRating) query.rating = { $gte: parseInt(minRating) };
    
    // Filter by status
    const status = searchParams.get('status');
    if (status) query.status = status;
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Get reviews
    const reviews = await Review.find(query)
      .skip(skip)
      .limit(limit)
      .populate('photographer', 'name avatar')
      .populate('client', 'name avatar')
      .populate('booking', 'service dateTime')
      .sort({ createdAt: -1 })
      .lean();
    
    // Get total count for pagination
    const total = await Review.countDocuments(query);
    
    return NextResponse.json({
      reviews,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  })
);

// POST /api/reviews
export const POST = withErrorHandler(
  withDB(
    withAuth(
      withValidation(reviewSchema, async (req: NextRequest) => {
        const body = await req.json();
        
        // Create review
        const review = await Review.create({
          ...body,
          status: 'published',
        });
        
        // Update photographer's stats
        await Photographer.findByIdAndUpdate(review.photographer, {
          $inc: {
            'stats.totalReviews': 1,
            'stats.averageRating': (review.rating - (await Review.aggregate([
              { $match: { photographer: review.photographer } },
              { $group: { _id: null, avg: { $avg: '$rating' } } },
            ])).avg) / (await Review.countDocuments({ photographer: review.photographer })),
          },
        });
        
        // Populate references
        await review.populate('photographer', 'name avatar');
        await review.populate('client', 'name avatar');
        await review.populate('booking', 'service dateTime');
        
        return NextResponse.json(review, { status: 201 });
      })
    )
  )
);
