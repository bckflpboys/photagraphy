import { auth, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { createAuthError, AuthErrorType } from "@/lib/auth-errors"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        createAuthError(AuthErrorType.UNAUTHORIZED),
        { status: 401 }
      )
    }

    const { userType } = await req.json()
    
    if (userType !== 'client' && userType !== 'photographer') {
      return NextResponse.json(
        createAuthError(AuthErrorType.INVALID_USER_TYPE),
        { status: 400 }
      )
    }

    // Validate user doesn't already have a user type
    const user = await clerkClient.users.getUser(userId)
    if (user.publicMetadata.userType) {
      return NextResponse.json(
        createAuthError(
          AuthErrorType.UNAUTHORIZED, 
          'User type has already been set and cannot be changed.'
        ),
        { status: 403 }
      )
    }

    // Update user metadata using the backend API
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { 
        userType,
        registrationDate: new Date().toISOString()
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: `Successfully registered as ${userType}` 
    })
  } catch (error) {
    console.error('Error setting user type:', error)
    return NextResponse.json(
      createAuthError(
        AuthErrorType.UNKNOWN_ERROR, 
        'Failed to set user type',
        error instanceof Error ? error.message : undefined
      ),
      { status: 500 }
    )
  }
}
