import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectDB from './db';

export type ApiHandler = (
  req: NextRequest,
  params?: { params: { [key: string]: string } }
) => Promise<NextResponse>;

export const withErrorHandler = (handler: ApiHandler): ApiHandler => {
  return async (req, params) => {
    try {
      return await handler(req, params);
    } catch (error: any) {
      console.error('API Error:', error);
      return NextResponse.json(
        {
          error: error.message || 'Internal Server Error',
        },
        {
          status: error.status || 500,
        }
      );
    }
  };
};

export const withDB = (handler: ApiHandler): ApiHandler => {
  return async (req, params) => {
    await connectDB();
    return handler(req, params);
  };
};

export const withAuth = (handler: ApiHandler): ApiHandler => {
  return async (req, params) => {
    // TODO: Implement authentication check using Clerk
    // For now, we'll just pass through
    return handler(req, params);
  };
};

export const withValidation = (schema: any, handler: ApiHandler): ApiHandler => {
  return async (req, params) => {
    const body = await req.json();
    try {
      await schema.validate(body);
      return handler(req, params);
    } catch (error: any) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }
  };
};
