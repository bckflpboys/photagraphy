import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth, withValidation } from '@/lib/api-middlewares';
import { Message, Conversation } from '@/models';
import { messageSchema, conversationSchema } from '@/lib/validations/message';

// GET /api/messages
export const GET = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest) => {
      const { searchParams } = new URL(req.url);
      
      // Get conversation ID
      const conversationId = searchParams.get('conversation');
      if (!conversationId) {
        return NextResponse.json(
          { error: 'Conversation ID is required' },
          { status: 400 }
        );
      }
      
      // Pagination
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const skip = (page - 1) * limit;
      
      // Get messages
      const messages = await Message.find({ conversation: conversationId })
        .skip(skip)
        .limit(limit)
        .populate('sender', 'name avatar')
        .sort({ createdAt: -1 })
        .lean();
      
      // Get total count for pagination
      const total = await Message.countDocuments({ conversation: conversationId });
      
      return NextResponse.json({
        messages,
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

// POST /api/messages
export const POST = withErrorHandler(
  withDB(
    withAuth(
      withValidation(messageSchema, async (req: NextRequest) => {
        const body = await req.json();
        
        // Get or create conversation
        let conversation = await Conversation.findOne({
          participants: { $all: [body.sender, body.receiver] },
        });
        
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [body.sender, body.receiver],
            unreadCount: { [body.receiver]: 1 },
          });
        } else {
          // Increment unread count for receiver
          await conversation.updateOne({
            $inc: { [`unreadCount.${body.receiver}`]: 1 },
          });
        }
        
        // Create message
        const message = await Message.create({
          ...body,
          conversation: conversation._id,
        });
        
        // Update conversation's last message
        await conversation.updateOne({
          lastMessage: message._id,
          updatedAt: new Date(),
        });
        
        // Populate sender details
        await message.populate('sender', 'name avatar');
        
        return NextResponse.json(message, { status: 201 });
      })
    )
  )
);
