// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { withDB, withErrorHandler, withAuth, withValidation } from '@/lib/api-middlewares';
// import { Review } from '@/models';
// import { reviewSchema, reviewResponseSchema, reviewReportSchema } from '@/lib/validations/review';

// // GET /api/reviews/[id]
// export const GET = withErrorHandler(
//   withDB(async (req: NextRequest, { params }: { params: { id: string } }) => {
//     const review = await Review.findById(params.id)
//       .populate('photographer', 'name avatar')
//       .populate('client', 'name avatar')
//       .populate('booking', 'service dateTime')
//       .lean();

//     if (!review) {
//       return NextResponse.json(
//         { error: 'Review not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(review);
//   })
// );

// // PATCH /api/reviews/[id]
// export const PATCH = withErrorHandler(
//   withDB(
//     withAuth(
//       withValidation(reviewSchema.partial(), async (req: NextRequest, { params }: { params: { id: string } }) => {
//         const body = await req.json();

//         const review = await Review.findByIdAndUpdate(
//           params.id,
//           { $set: body },
//           { new: true, runValidators: true }
//         )
//           .populate('photographer', 'name avatar')
//           .populate('client', 'name avatar')
//           .populate('booking', 'service dateTime');

//         if (!review) {
//           return NextResponse.json(
//             { error: 'Review not found' },
//             { status: 404 }
//           );
//         }

//         return NextResponse.json(review);
//       })
//     )
//   )
// );

// // DELETE /api/reviews/[id]
// export const DELETE = withErrorHandler(
//   withDB(
//     withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
//       const review = await Review.findByIdAndDelete(params.id);

//       if (!review) {
//         return NextResponse.json(
//           { error: 'Review not found' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(
//         { message: 'Review deleted successfully' },
//         { status: 200 }
//       );
//     })
//   )
// );
