"use client"

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SelectTypePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useUser()
  const router = useRouter()

  const handleTypeSelection = async (type: 'client' | 'photographer') => {
    setIsLoading(true)
    setError('')

    try {
      // Update user metadata with selected type
      await user?.update({
        unsafeMetadata: {
          userType: type
        }
      })

      // Redirect to appropriate dashboard
      router.push(`/${type}/dashboard`)
    } catch (err) {
      console.error('Error setting user type:', err)
      setError('Failed to set user type. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-dark text-center mb-6">
          Welcome to CaptureConnect
        </h2>
        <p className="text-secondary text-center mb-8">
          Please select how you want to use CaptureConnect
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleTypeSelection('client')}
            disabled={isLoading}
            className="w-full p-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>I want to hire photographers</span>
          </button>
          <button
            onClick={() => handleTypeSelection('photographer')}
            disabled={isLoading}
            className="w-full p-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>I am a photographer</span>
          </button>
        </div>

        {isLoading && (
          <div className="mt-4 text-center text-secondary">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto mb-2"></div>
            Setting up your account...
          </div>
        )}
      </div>
    </div>
  )
}
