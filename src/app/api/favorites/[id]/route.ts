import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withDB, withErrorHandler, withAuth } from '@/lib/api-middlewares';
import { Favorite } from '@/models';

// DELETE /api/favorites/[id]
export const DELETE = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
      const favorite = await Favorite.findByIdAndDelete(params.id);

      if (!favorite) {
        return NextResponse.json(
          { error: 'Favorite not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: 'Removed from favorites' },
        { status: 200 }
      );
    })
  )
);
