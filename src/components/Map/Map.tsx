"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface Photographer {
  id: string
  name: string
  location: { lat: number; lng: number }
  isAvailable: boolean
  rating: number
  sessionInfo?: {
    startTime: string
    endTime: string
    price: number
    isShareable: boolean
    currentClients: number
    maxClients: number
  } | null
}

interface MapProps {
  center: { lat: number; lng: number }
  radius: number
  photographers: Photographer[]
  onPhotographerClick?: (photographer: Photographer) => void
}

// Singleton Loader to prevent multiple initializations
let mapLoader: Loader | null = null;

export default function Map({ center, radius, photographers, onPhotographerClick }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [circle, setCircle] = useState<google.maps.Circle | null>(null)
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([])
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([])
  const [mapError, setMapError] = useState<string | null>(null)
  const [nearestPhotographers, setNearestPhotographers] = useState<Photographer[]>([])

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  }, []);

  // Filter photographers within the specified radius
  const filterNearestPhotographers = useCallback(() => {
    const filteredPhotographers = photographers.filter(photographer => {
      const distance = calculateDistance(
        center.lat, 
        center.lng, 
        photographer.location.lat, 
        photographer.location.lng
      );
      return distance <= radius && photographer.isAvailable;
    });

    setNearestPhotographers(filteredPhotographers);
  }, [photographers, center, radius, calculateDistance]);

  // Use this effect to filter photographers when component mounts or props change
  useEffect(() => {
    filterNearestPhotographers();
  }, [filterNearestPhotographers]);

  const initMap = useCallback(async () => {
    try {
      // Validate API key and Map ID
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID

      if (!apiKey) {
        throw new Error('Google Maps API Key is missing')
      }

      if (!mapId) {
        throw new Error('Google Maps Map ID is missing')
      }

      // Create loader only once
      if (!mapLoader) {
        mapLoader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['marker', 'places', 'geometry'],
          mapIds: [mapId]
        });
      }

      // Import map libraries with error catching
      const { Map } = await mapLoader.importLibrary('maps')
      const { AdvancedMarkerElement } = await mapLoader.importLibrary('marker') as google.maps.MarkerLibrary

      if (!mapRef.current) {
        throw new Error('Map container not found')
      }

      const mapInstance = new Map(mapRef.current, {
        center,
        zoom: 12,
        mapId,
      })

      const circleInstance = new google.maps.Circle({
        strokeColor: '#8B4513',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#8B4513',
        fillOpacity: 0.1,
        map: mapInstance,
        center: center,
        radius: radius * 1000,
      })

      setMap(mapInstance)
      setCircle(circleInstance)
      setMapError(null)
    } catch (error) {
      console.error('Google Maps Initialization Error:', error)
      setMapError(error instanceof Error ? error.message : 'Unknown map initialization error')
    }
  }, [center, radius])

  useEffect(() => {
    initMap()

    return () => {
      markers.forEach(marker => marker.map = null)
      infoWindows.forEach(window => window.close())
    }
  }, [initMap])

  const calculateTimeLeft = (endTime: string): string => {
    const end = new Date(endTime);
    const now = new Date();
    const diffMs = end.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 0) return 'Session ended';
    if (diffMins < 60) return `${diffMins} minutes left`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m left`;
  };

  const getSessionContent = (photographer: Photographer): string => {
    return photographer.sessionInfo
      ? `
        <div class="font-medium text-green-600">Active Session</div>
        <div class="text-sm mt-1">${calculateTimeLeft(photographer.sessionInfo.endTime)}</div>
        ${photographer.sessionInfo.isShareable 
          ? `<div class="text-sm mt-1">Shareable (${photographer.sessionInfo.currentClients}/${photographer.sessionInfo.maxClients} clients)</div>
             <div class="text-sm">Session price: $${photographer.sessionInfo.price}</div>`
          : '<div class="text-sm mt-1">Private Session</div>'
        }`
      : '<div class="text-sm mt-1">Available for booking</div>';
  };

  const updateMarkers = async () => {
    if (!map || !mapLoader) return

    const { AdvancedMarkerElement } = await mapLoader.importLibrary('marker') as google.maps.MarkerLibrary

    // Clear existing markers
    markers.forEach(marker => marker.map = null)
    infoWindows.forEach(window => window.close())

    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = []
    const newInfoWindows: google.maps.InfoWindow[] = []

    nearestPhotographers.forEach(photographer => {
      // Create a more interactive marker element
      const markerElement = document.createElement('div')
      markerElement.className = 'photographer-marker'
      markerElement.style.width = '24px'
      markerElement.style.height = '24px'
      markerElement.style.borderRadius = '50%'
      markerElement.style.backgroundColor = photographer.isAvailable ? 'green' : 'red'
      markerElement.style.cursor = 'pointer'

      const marker = new AdvancedMarkerElement({
        map,
        position: photographer.location,
        content: markerElement
      })

      // Create detailed info window content
      const infoContent = document.createElement('div')
      infoContent.innerHTML = `
        <div class="p-2 max-w-xs">
          <h3 class="font-bold text-lg mb-2">${photographer.name}</h3>
          <div class="flex items-center mb-2">
            <span class="mr-2">Rating:</span>
            <span class="text-yellow-500">
              ${[...Array(5)].map((_, i) => 
                i < Math.floor(photographer.rating) 
                  ? '★' 
                  : '☆'
              ).join('')}
            </span>
            <span class="ml-2 text-gray-600">(${photographer.rating})</span>
          </div>
          ${photographer.sessionInfo ? `
            <div class="mb-2">
              <p class="text-sm">Session Price: <span class="font-semibold">$${photographer.sessionInfo.price}</span></p>
              <p class="text-sm">Available Slots: ${photographer.sessionInfo.currentClients}/${photographer.sessionInfo.maxClients}</p>
            </div>
          ` : '<p class="text-sm text-gray-600">Private Session</p>'}
          <p class="text-xs text-gray-500 mt-2">Click for more details</p>
        </div>
      `

      const infoWindow = new google.maps.InfoWindow({
        content: infoContent,
        ariaLabel: photographer.name
      })

      // Use both mouse events to ensure hover works
      marker.addListener('mouseover', () => {
        infoWindows.forEach(window => window.close())
        infoWindow.open({
          anchor: marker,
          map,
        })
      })

      marker.addListener('mouseout', () => {
        infoWindow.close()
      })

      marker.addListener('click', () => {
        // Navigate to share page or trigger onPhotographerClick
        if (onPhotographerClick) {
          onPhotographerClick(photographer)
        }
      })

      // Add event listeners directly to the marker element
      markerElement.addEventListener('mouseover', () => {
        infoWindows.forEach(window => window.close())
        infoWindow.open({
          anchor: marker,
          map,
        })
      })

      markerElement.addEventListener('mouseout', () => {
        infoWindow.close()
      })

      newMarkers.push(marker)
      newInfoWindows.push(infoWindow)
    })

    setMarkers(newMarkers)
    setInfoWindows(newInfoWindows)
  }

  useEffect(() => {
    updateMarkers()
  }, [map, nearestPhotographers, onPhotographerClick, mapLoader])

  useEffect(() => {
    if (circle) {
      circle.setRadius(radius * 1000)
    }
  }, [radius])

  useEffect(() => {
    if (!map) return

    // Remove existing circle if it exists
    if (circle) {
      circle.setMap(null)
    }

    // Create new circle
    const newCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.15,
      map,
      center,
      radius: radius * 1000 // Convert kilometers to meters
    })

    setCircle(newCircle)
  }, [map, center, radius])

  // Render fallback UI if map fails to load
  if (mapError) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Map Loading Error</h2>
          <p className="text-gray-700">{mapError}</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check your internet connection or API configuration.
          </p>
          <div className="mt-4">
            <p className="text-xs">Debug Info:</p>
            <p className="text-xs">API Key: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing'}</p>
            <p className="text-xs">Map ID: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || 'Missing'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {mapError && <div className="text-red-500">{mapError}</div>}
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
      <div className="mt-4">
        <h3 className="text-lg font-bold">Nearby Photographers</h3>
        {nearestPhotographers.length === 0 ? (
          <p>No photographers available in this area.</p>
        ) : (
          <ul className="space-y-2">
            {nearestPhotographers.map(photographer => (
              <li 
                key={photographer.id} 
                className="bg-white shadow rounded p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => onPhotographerClick && onPhotographerClick(photographer)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{photographer.name}</span>
                  <span className="text-sm text-gray-600">
                    Rating: {photographer.rating}/5
                  </span>
                </div>
                {photographer.sessionInfo ? (
                  <div className="text-sm text-gray-500">
                    Price: ${photographer.sessionInfo.price}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    Private Session
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
