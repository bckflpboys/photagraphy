"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function PhotographerDashboard() {
  return (
    <DashboardLayout userType="photographer">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-secondary mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-primary">24</p>
            <p className="text-sm text-secondary mt-2">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-secondary mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-primary">$2,450</p>
            <p className="text-sm text-secondary mt-2">+8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-secondary mb-2">Rating</h3>
            <p className="text-3xl font-bold text-primary">4.8</p>
            <p className="text-sm text-secondary mt-2">Based on 56 reviews</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-secondary mb-2">Profile Views</h3>
            <p className="text-3xl font-bold text-primary">342</p>
            <p className="text-sm text-secondary mt-2">Last 30 days</p>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark mb-4">Upcoming Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-accent">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Client</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-dark">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent">
                <tr>
                  <td className="px-6 py-4 text-sm text-dark">John Smith</td>
                  <td className="px-6 py-4 text-sm text-dark">Dec 28, 2024</td>
                  <td className="px-6 py-4 text-sm text-dark">14:00</td>
                  <td className="px-6 py-4 text-sm text-dark">Central Park</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-white">
                      Confirmed
                    </span>
                  </td>
                </tr>
                {/* Add more booking rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="border-b border-accent pb-4">
              <div className="flex items-center mb-2">
                <span className="text-primary">⭐⭐⭐⭐⭐</span>
                <span className="ml-2 text-sm text-secondary">2 days ago</span>
              </div>
              <p className="text-dark mb-2">"Amazing photographer! Captured our wedding beautifully."</p>
              <p className="text-sm text-secondary">- Sarah Johnson</p>
            </div>
            {/* Add more reviews as needed */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
