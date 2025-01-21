// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { withDB, withErrorHandler, withAuth } from '@/lib/api-middlewares';
// import { Photographer } from '@/models';
// import * as yup from 'yup';

// const availabilitySchema = yup.object({
//   status: yup.string().oneOf(['available', 'busy', 'away']).required(),
//   schedule: yup.array().of(
//     yup.object({
//       day: yup
//         .string()
//         .oneOf([
//           'monday',
//           'tuesday',
//           'wednesday',
//           'thursday',
//           'friday',
//           'saturday',
//           'sunday',
//         ])
//         .required(),
//       slots: yup.array().of(
//         yup.object({
//           start: yup.string().required(),
//           end: yup.string().required(),
//         })
//       ),
//     })
//   ),
//   customDates: yup.array().of(
//     yup.object({
//       date: yup.date().required(),
//       available: yup.boolean().required(),
//       slots: yup.array().of(
//         yup.object({
//           start: yup.string(),
//           end: yup.string(),
//         })
//       ),
//     })
//   ),
// });

// // GET /api/photographers/[id]/availability
// export const GET = withErrorHandler(
//   withDB(async (req: NextRequest, { params }: { params: { id: string } }) => {
//     const photographer = await Photographer.findById(params.id)
//       .select('availability')
//       .lean();

//     if (!photographer) {
//       return NextResponse.json(
//         { error: 'Photographer not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(photographer.availability);
//   })
// );

// // PUT /api/photographers/[id]/availability
// export const PUT = withErrorHandler(
//   withDB(
//     withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
//       const body = await req.json();

//       try {
//         await availabilitySchema.validate(body);
//       } catch (error: any) {
//         return NextResponse.json(
//           { error: error.message },
//           { status: 400 }
//         );
//       }

//       const photographer = await Photographer.findByIdAndUpdate(
//         params.id,
//         { $set: { availability: body } },
//         { new: true, runValidators: true }
//       ).select('availability');

//       if (!photographer) {
//         return NextResponse.json(
//           { error: 'Photographer not found' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(photographer.availability);
//     })
//   )
// );

// // PATCH /api/photographers/[id]/availability/status
// export const PATCH = withErrorHandler(
//   withDB(
//     withAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
//       const body = await req.json();

//       try {
//         await yup
//           .object({
//             status: yup
//               .string()
//               .oneOf(['available', 'busy', 'away'])
//               .required(),
//           })
//           .validate(body);
//       } catch (error: any) {
//         return NextResponse.json(
//           { error: error.message },
//           { status: 400 }
//         );
//       }

//       const photographer = await Photographer.findByIdAndUpdate(
//         params.id,
//         { $set: { 'availability.status': body.status } },
//         { new: true, runValidators: true }
//       ).select('availability');

//       if (!photographer) {
//         return NextResponse.json(
//           { error: 'Photographer not found' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(photographer.availability);
//     })
//   )
// );
