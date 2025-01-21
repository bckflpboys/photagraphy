"use client"

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <SignIn 
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
      />
    </div>
  )
}
