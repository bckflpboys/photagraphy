"use client"

import { useState } from 'react'
import { SignUp, useSignUp } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [userType, setUserType] = useState<'client' | 'photographer' | null>(null)
  const { signUp } = useSignUp()
  const router = useRouter()

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-dark text-center mb-6">
            Join CaptureConnect
          </h2>
          <p className="text-secondary text-center mb-8">
            Choose how you want to use CaptureConnect
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setUserType('client')}
              className="w-full p-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center space-x-2"
            >
              <span>I want to hire photographers</span>
            </button>
            <button
              onClick={() => setUserType('photographer')}
              className="w-full p-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center justify-center space-x-2"
            >
              <span>I am a photographer</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white shadow-xl border-0",
            headerTitle: "text-dark text-2xl font-bold",
            headerSubtitle: "text-secondary",
            formButtonPrimary: "bg-primary hover:bg-secondary",
            formFieldInput: "border-accent focus:border-primary",
            footerActionLink: "text-primary hover:text-secondary",
          },
        }}
        redirectUrl={`/onboarding/${userType}`}
      />
    </div>
  )
}
