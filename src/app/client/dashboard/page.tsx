"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Link from 'next/link'

export default function ClientDashboard() {
  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/photographers"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-primary mb-2">Find Photographers</h3>
            <p className="text-secondary">Browse and book talented photographers in your area</p>
          </Link>
          <Link
            href="/client/bookings"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-primary mb-2">My Bookings</h3>
            <p className="text-secondary">View and manage your photography sessions</p>
          </Link>
          <Link
            href="/client/messages"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-primary mb-2">Messages</h3>
            <p className="text-secondary">Chat with your photographers</p>
          </Link>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-dark">Family Portrait Session</h3>
                  <p className="text-secondary">with Michael Brown</p>
                  <p className="text-sm text-secondary mt-1">Dec 30, 2024 • 15:00</p>
                  <p className="text-sm text-secondary">Central Park, New York</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                  View Details
                </button>
              </div>
            </div>
            {/* Add more upcoming sessions as needed */}
          </div>
        </div>

        {/* Favorite Photographers */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark mb-4">Favorite Photographers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-accent rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-accent rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-dark">Emily White</h3>
                  <p className="text-sm text-secondary">Portrait Specialist</p>
                  <div className="flex items-center mt-1">
                    <span className="text-primary">⭐ 4.9</span>
                    <span className="text-sm text-secondary ml-2">(124 reviews)</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                Book Now
              </button>
            </div>
            {/* Add more favorite photographers as needed */}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-dark">You received photos from your last session</p>
                <p className="text-sm text-secondary">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-dark">Booking confirmed with Michael Brown</p>
                <p className="text-sm text-secondary">1 day ago</p>
              </div>
            </div>
            {/* Add more activity items as needed */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
