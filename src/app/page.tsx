"use client"

import { useState, useEffect } from 'react'
import Map from '@/components/Map/Map'
import RadiusSlider from '@/components/Map/RadiusSlider'

interface Photographer {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  isAvailable: boolean;
  rating: number;
  sessionInfo?: {
    startTime: string;
    endTime: string;
    price: number;
    isShareable: boolean;
    currentClients: number;
    maxClients: number;
  } | null;
}

// Mock data for photographers (replace with real data from your backend)
const mockPhotographers = [
  {
    id: '1',
    name: 'John Doe',
    location: { lat: -26.2041, lng: 28.0473 }, // Johannesburg
    isAvailable: true,
    rating: 5
  },
  {
    id: '2',
    name: 'Jane Smith',
    location: { lat: -26.1975, lng: 28.0568 },
    isAvailable: false,
    rating: 4
  },
  // Add more mock photographers as needed
]

export default function Home() {
  const [activePhotographers, setActivePhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState(10)
  const [center] = useState({ lat: -26.2041, lng: 28.0473 }) // Johannesburg coordinates

  useEffect(() => {
    const fetchActivePhotographers = async () => {
      try {
        const response = await fetch('/api/photographers/active');
        if (!response.ok) {
          throw new Error('Failed to fetch active photographers');
        }
        const data = await response.json();
        setActivePhotographers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch photographers');
      } finally {
        setLoading(false);
      }
    };

    fetchActivePhotographers();
    // Refresh active photographers every minute
    const interval = setInterval(fetchActivePhotographers, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePhotographerClick = (photographer: Photographer) => {
    if (photographer.sessionInfo?.isShareable) {
      // Navigate to share request page or open modal
      window.location.href = `/share?photographerId=${photographer.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-dark text-light">
        <div className="absolute inset-0 bg-gradient-to-r from-dark to-secondary opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect <span className="text-primary">Photographer</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-accent">
            Connect with talented photographers in your area for your special moments
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-primary text-light px-8 py-3 rounded-lg hover:bg-secondary transition-colors">
              Find Photographers
            </button>
            <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-light transition-colors">
              Join as Photographer
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark mb-4">
              Photographers Near You
            </h2>
            <p className="text-secondary mb-8">
              Find available photographers in your area and connect instantly
            </p>
            <div className="flex justify-center mb-8">
              <RadiusSlider radius={radius} onChange={setRadius} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <Map
                center={center}
                radius={radius}
                photographers={activePhotographers}
                onPhotographerClick={handlePhotographerClick}
              />
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-light p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-4">
                Real-Time Availability
              </h3>
              <p className="text-secondary">
                See which photographers are currently available and book them instantly.
              </p>
            </div>
            <div className="bg-light p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-4">
                Verified Professionals
              </h3>
              <p className="text-secondary">
                All photographers are verified and reviewed by our community.
              </p>
            </div>
            <div className="bg-light p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-4">
                Instant Booking
              </h3>
              <p className="text-secondary">
                Book and confirm your session with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
