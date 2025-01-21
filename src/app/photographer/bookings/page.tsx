import React from 'react';
import Bookings from '@/components/photographers/Bookings';

export default function BookingsPage() {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <Bookings />
      </div>
    </main>
  );
}
