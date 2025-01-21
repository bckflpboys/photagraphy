"use client"

import { useEffect, useState } from 'react'
import { SearchProvider, useSearch } from '@/contexts/SearchContext'
import SearchComponent from '@/components/search/SearchComponent'
import PhotographerCard from '@/components/photographers/PhotographerCard'

// Mock data - replace with actual API call
const mockPhotographers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    imageUrl: '/photographers/sarah.jpg',
    specialties: ['Portrait', 'Wedding'],
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 150,
    isOnline: true,
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'Michael Chen',
    imageUrl: '/photographers/michael.jpg',
    specialties: ['Fashion', 'Event'],
    rating: 4.8,
    reviewCount: 95,
    hourlyRate: 120,
    isOnline: false,
    location: 'Los Angeles, CA'
  },
  // Add more mock photographers...
]

function PhotographersContent() {
  const { filters, setIsLoading } = useSearch()
  const [filteredPhotographers, setFilteredPhotographers] = useState(mockPhotographers)

  useEffect(() => {
    const filterPhotographers = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const filtered = mockPhotographers.filter(photographer => {
          // Filter by search query
          if (filters.query && !photographer.name.toLowerCase().includes(filters.query.toLowerCase())) {
            return false
          }

          // Filter by price range
          if (photographer.hourlyRate < filters.priceRange[0] || photographer.hourlyRate > filters.priceRange[1]) {
            return false
          }

          // Filter by specialties
          if (filters.specialties.length > 0 && !photographer.specialties.some(s => filters.specialties.includes(s))) {
            return false
          }

          // Filter by availability
          if (filters.availability !== null && photographer.isOnline !== filters.availability) {
            return false
          }

          return true
        })

        // Sort photographers
        if (filters.sortBy) {
          filtered.sort((a, b) => {
            switch (filters.sortBy) {
              case 'rating':
                return b.rating - a.rating
              case 'price_low':
                return a.hourlyRate - b.hourlyRate
              case 'price_high':
                return b.hourlyRate - a.hourlyRate
              case 'reviews':
                return b.reviewCount - a.reviewCount
              default:
                return 0
            }
          })
        }

        setFilteredPhotographers(filtered)
      } finally {
        setIsLoading(false)
      }
    }

    filterPhotographers()
  }, [filters, setIsLoading])

  return (
    <div className="min-h-screen bg-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-dark mb-4">
            Find Your Perfect Photographer
          </h1>
          <p className="text-xl text-secondary">
            Browse through our talented photographers and find the perfect match for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search Component */}
          <div className="lg:col-span-1">
            <SearchComponent
              placeholder="Search photographers..."
              showFilters={true}
              className="sticky top-24"
            />
          </div>

          {/* Photographers Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPhotographers.map(photographer => (
                <PhotographerCard
                  key={photographer.id}
                  photographer={photographer}
                />
              ))}
            </div>

            {filteredPhotographers.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-xl text-dark mb-2">No photographers found</h3>
                <p className="text-secondary">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PhotographersPage() {
  return (
    <SearchProvider>
      <PhotographersContent />
    </SearchProvider>
  )
}
