"use client"

import Link from 'next/link'
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()

  const userType = user?.publicMetadata?.userType as string

  return (
    <nav className="bg-dark text-light shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">CaptureConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-8">
              <Link
                href="/photographers"
                className="text-light inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary hover:text-primary transition-colors"
              >
                Find Photographers
              </Link>
              <Link
                href="/share"
                className="text-light inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary hover:text-primary transition-colors"
              >
                Share
              </Link>
              <Link
                href="/pricing"
                className="text-light inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary hover:text-primary transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:text-light hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <Link
                href={`/${userType}/dashboard`}
                className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-dark border border-primary",
                    userButtonPopoverActionButton: "hover:bg-secondary text-light hover:text-light",
                    userButtonPopoverActionButtonText: "text-light",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-primary text-light hover:bg-secondary px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-dark border-t border-secondary ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/photographers"
            className="text-light hover:text-primary block px-3 py-2 rounded-md text-base font-medium text-center"
          >
            Find Photographers
          </Link>
          <Link
            href="/share"
            className="text-light hover:text-primary block px-3 py-2 rounded-md text-base font-medium text-center"
          >
            Share
          </Link>
          <Link
            href="/pricing"
            className="text-light hover:text-primary block px-3 py-2 rounded-md text-base font-medium text-center"
          >
            Pricing
          </Link>
          <SignedIn>
            <Link
              href={`/${userType}/dashboard`}
              className="text-light hover:text-primary block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Dashboard
            </Link>
            <div className="flex justify-center px-3 py-2">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "bg-dark border border-primary",
                    userButtonPopoverActionButton: "hover:bg-secondary text-light hover:text-light",
                    userButtonPopoverActionButtonText: "text-light",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-light hover:text-primary block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-primary text-light hover:bg-secondary block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
