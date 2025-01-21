import { authMiddleware, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"

// Routes that don't require authentication or user type
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhook/clerk"
]

// Routes that require authentication but don't require user type
const authRoutes = [
  "/select-type",
  "/onboarding",
  "/api/set-user-type"
]

export default authMiddleware({
  publicRoutes,
  async afterAuth(auth, req, evt) {
    // Allow public routes
    if (publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next()
    }

    // Allow auth routes if user is authenticated
    if (authRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
      if (!auth.userId) {
        const signInUrl = new URL('/sign-in', req.url)
        return NextResponse.redirect(signInUrl)
      }
      return NextResponse.next()
    }

    // Redirect to sign-in if not authenticated
    if (!auth.userId) {
      const signInUrl = new URL('/sign-in', req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Get user data
    const user = await clerkClient.users.getUser(auth.userId)
    const userType = user.publicMetadata.userType as string | undefined

    // If no user type is set and not on select-type page, redirect to select-type
    if (!userType) {
      const selectTypeUrl = new URL('/select-type', req.url)
      return NextResponse.redirect(selectTypeUrl)
    }

    // Protect dashboard routes based on user type
    if (req.nextUrl.pathname.startsWith('/client/') && userType === 'photographer') {
      return NextResponse.redirect(new URL('/photographer/dashboard', req.url))
    }
    
    if (req.nextUrl.pathname.startsWith('/photographer/') && userType === 'client') {
      return NextResponse.redirect(new URL('/client/dashboard', req.url))
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
