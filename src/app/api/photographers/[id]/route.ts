// Temporarily disabled API route
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force dynamic to ensure proper routing
export const dynamic = 'force-dynamic';

// Commented out original implementation
/*
import { withDB, withErrorHandler, withAuth, withValidation } from '@/lib/api-middlewares';
import { Photographer } from '@/models';
import { photographerSchema } from '@/lib/validations/photographer';

// GET /api/photographers/[id]
export const GET = withErrorHandler(
  withDB(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const photographer = await Photographer.findById(params.id)
      .select('-settings')
      .lean();

    if (!photographer) {
      return NextResponse.json(
        { error: 'Photographer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(photographer);
  })
);

// PATCH /api/photographers/[id]
export const PATCH = withErrorHandler(
  withDB(
    withAuth(
      withValidation(photographerSchema.partial(), async (req: NextRequest, { params }: { params: { id: string } }) => {
        const body = await req.json();

        const photographer = await Photographer.findByIdAndUpdate(
          params.id,
          { $set: body },
          { new: true, runValidators: true }
        );

        if (!photographer) {
          return NextResponse.json(
            { error: 'Photographer not found' },
            { status: 404 }
          );
        }

        return NextResponse.json(photographer);
      })
    )
  )
);

// DELETE /api/photographers/[id]
export const DELETE = withErrorHandler(
  withDB(
    withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
      const photographer = await Photographer.findByIdAndDelete(params.id);

      if (!photographer) {
        return NextResponse.json(
          { error: 'Photographer not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: 'Photographer deleted successfully' },
        { status: 200 }
      );
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
