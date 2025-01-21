import React, { useState, useEffect } from 'react';
import type { Session, Client } from '@/app/api/models/Session';

interface SessionShareManagerProps {
  session: Session;
  currentClient?: Client;
  onShareUpdate?: (sharePreference: boolean) => void;
}

export default function SessionShareManager({
  session,
  currentClient,
  onShareUpdate,
}: SessionShareManagerProps) {
  const [isShareable, setIsShareable] = useState(session.isShareable);
  const [priceShare, setPriceShare] = useState(0);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(`/api/sessions/${session.id}/share`);
        const data = await response.json();
        setIsShareable(data.isShareable);
        setPriceShare(data.pricePerClient);
      } catch (error) {
        console.error('Failed to fetch session details:', error);
      }
    };

    fetchSessionDetails();
  }, [session.id]);

  const handleShareToggle = async () => {
    if (!currentClient) return;

    try {
      const response = await fetch(`/api/sessions/${session.id}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: currentClient.id,
          sharePreference: !isShareable,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsShareable(!isShareable);
        onShareUpdate?.(!isShareable);
      }
    } catch (error) {
      console.error('Failed to update sharing preference:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Session Sharing Options</h3>
      
      {currentClient ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span>Share your session with others?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isShareable}
                onChange={handleShareToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {isShareable && (
            <div className="text-sm text-gray-600">
              <p>Your new price share: ${priceShare}</p>
              <p className="mt-2">
                By sharing your session, other clients can join at a reduced rate,
                and your cost will be adjusted accordingly.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isShareable ? (
            <div className="text-sm text-gray-600">
              <p>This session is available for sharing!</p>
              <p className="font-semibold mt-2">Price per client: ${priceShare}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => {/* TODO: Implement join session logic */}}
              >
                Join Session
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              This session is currently private and not available for sharing.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
