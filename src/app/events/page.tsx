'use client';

import React from 'react';
import ActiveSessionCard from '@/components/ActiveSessionCard';
import { Session } from '@/app/api/models/Session';

export default function SharePage() {
  const [activeSessions, setActiveSessions] = React.useState<Session[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const response = await fetch('/api/sessions/active');
        if (!response.ok) {
          throw new Error('Failed to fetch active sessions');
        }
        const data = await response.json();
        setActiveSessions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch active sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSessions();
    // Refresh active sessions every minute
    const interval = setInterval(fetchActiveSessions, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinRequest = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to send join request');
      }
      
      // Handle successful join request (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error sending join request:', error);
      // Handle error (e.g., show error message)
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Active Photography Sessions</h1>
        <div className="text-sm text-gray-500">
          Showing {activeSessions.length} active session(s)
        </div>
      </div>

      {activeSessions.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active sessions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later for available photography sessions to join.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSessions.map((session) => (
            <ActiveSessionCard
              key={session.id}
              session={session}
              onJoinRequest={() => handleJoinRequest(session.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
