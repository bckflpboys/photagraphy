import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth } from '@/lib/api-middlewares';
import { Conversation } from '@/models';

// GET /api/conversations
export const GET = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest) => {
      const { searchParams } = new URL(req.url);
      
      // Get user ID
      const userId = searchParams.get('userId');
      if (!userId) {
        return NextResponse.json(
          { error: 'User ID is required' },
          { status: 400 }
        );
      }
      
      // Pagination
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const skip = (page - 1) * limit;
      
      // Get conversations
      const conversations = await Conversation.find({
        participants: userId,
        status: 'active',
      })
        .skip(skip)
        .limit(limit)
        .populate('participants', 'name avatar')
        .populate('lastMessage')
        .sort({ updatedAt: -1 })
        .lean();
      
      // Get total count for pagination
      const total = await Conversation.countDocuments({
        participants: userId,
        status: 'active',
      });
      
      return NextResponse.json({
        conversations,
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
