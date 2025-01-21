"use client"

import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import MessageIcon from '@mui/icons-material/Message';
import Badge from '@mui/material/Badge';
import { Box, Container } from '@mui/material'

interface SidebarLink {
  href: string
  label: string
  icon: string
  badge?: number
}

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: 'client' | 'photographer'
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const photographerLinks: SidebarLink[] = [
    { href: '/photographer/dashboard', label: 'Overview', icon: '📊' },
    { href: '/photographer/bookings', label: 'Bookings', icon: '📅' },
    { href: '/photographer/portfolio', label: 'Portfolio', icon: '🖼️' },
    { href: '/photographer/availability', label: 'Availability', icon: '⏰' },
    { href: '/photographer/messages', label: 'Messages', icon: '💬', badge: 3 },
    { href: '/photographer/reviews', label: 'Reviews', icon: '⭐' },
    { href: '/photographer/earnings', label: 'Earnings', icon: '💰' },
  ]

  const clientLinks: SidebarLink[] = [
    { href: '/client/dashboard', label: 'Overview', icon: '🏠' },
    { href: '/client/bookings', label: 'My Bookings', icon: '📅' },
    { href: '/client/favorites', label: 'Favorite Photographers', icon: '❤️' },
    { href: '/client/messages', label: 'Messages', icon: '💬', badge: 3 },
    { href: '/client/reviews', label: 'My Reviews', icon: '⭐' },
  ]

  const links = userType === 'photographer' ? photographerLinks : clientLinks

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-dark">
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-xl font-semibold text-white">Dashboard</span>
            {/* Close button - only visible on mobile */}
            <button
              onClick={toggleSidebar}
              className="text-white p-2 rounded-lg hover:bg-gray-700 md:hidden"
            >
              ✕
            </button>
          </div>

          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-700 group ${
                    pathname === link.href ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile when link is clicked
                >
                  <span className="mr-3">{link.icon}</span>
                  <span className="text-white flex-grow">{link.label}</span>
                  {link.badge && (
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-4 left-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header with Menu Button */}
        <div className="p-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            ☰
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
