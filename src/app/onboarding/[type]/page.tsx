"use client"

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { AuthError, AuthErrorType } from '@/lib/auth-errors'

export default function OnboardingPage({
  params: { type },
}: {
  params: { type: 'client' | 'photographer' }
}) {
  const { user } = useUser()
  const router = useRouter()
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    const setupUserType = async () => {
      try {
        // Call our API endpoint to set the user type
        const response = await fetch('/api/set-user-type', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userType: type }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw {
            type: data.type || AuthErrorType.UNKNOWN_ERROR,
            message: data.message || 'Failed to set user type',
            details: data.details
          }
        }

        // Redirect to the appropriate dashboard
        router.push(`/${type}/dashboard`)
      } catch (error) {
        console.error('Error setting user type:', error)
        
        // Ensure error is in the correct format
        const authError = error as AuthError
        setError(authError)

        // Redirect to selection page after a delay if there's an error
        setTimeout(() => {
          router.push('/select-type')
        }, 5000)
      }
    }

    if (user) {
      setupUserType()
    }
  }, [user, type, router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md">
          <div className="text-red-600 mb-4 text-xl font-bold">
            {error.type === AuthErrorType.UNAUTHORIZED 
              ? 'Account Setup Error' 
              : 'Authentication Error'}
          </div>
          <div className="text-dark mb-4">{error.message}</div>
          {error.details && (
            <div className="text-secondary text-sm mb-4">
              Additional Details: {error.details}
            </div>
          )}
          <div className="text-secondary">
            Redirecting to user type selection in 5 seconds...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl text-dark">Setting up your account...</h2>
        <p className="text-secondary mt-2">
          Registering as a {type} on CaptureConnect
        </p>
      </div>
    </div>
  )
}
