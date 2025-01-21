"use client"

import { useState, useEffect } from 'react'
import { useSearch } from '@/contexts/SearchContext'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchComponentProps {
  placeholder?: string
  showFilters?: boolean
  onSearch?: () => void
  className?: string
}

export default function SearchComponent({
  placeholder = "Search...",
  showFilters = true,
  onSearch,
  className = "",
}: SearchComponentProps) {
  const { filters, setFilters, resetFilters, isLoading } = useSearch()
  const [localQuery, setLocalQuery] = useState(filters.query)
  const debouncedQuery = useDebounce(localQuery, 300)

  const specialties = [
    'Portrait', 'Wedding', 'Event', 'Fashion', 
    'Product', 'Real Estate', 'Nature', 'Sports'
  ]

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'reviews', label: 'Most Reviews' },
  ]

  useEffect(() => {
    setFilters({ query: debouncedQuery })
    onSearch?.()
  }, [debouncedQuery, setFilters, onSearch])

  const handleSpecialtyToggle = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty]
    setFilters({ specialties: newSpecialties })
    onSearch?.()
  }

  const handlePriceChange = (min: number, max: number) => {
    setFilters({ priceRange: [min, max] })
    onSearch?.()
  }

  const handleSortChange = (value: string) => {
    setFilters({ sortBy: value as any })
    onSearch?.()
  }

  return (
    <div className={`bg-white rounded-lg shadow-md border border-accent/20 ${className}`}>
      {/* Search Bar */}
      <div className="p-4 border-b border-accent">
        <div className="relative">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-accent rounded-lg focus:outline-none focus:border-primary"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
            🔍
          </span>
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="p-4 space-y-4">
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy || ''}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full p-2 border border-accent rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Most Relevant</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Price Range (per hour)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                className="w-24 px-2 py-1 border border-accent rounded-lg"
                min="0"
              />
              <span className="text-secondary">to</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                className="w-24 px-2 py-1 border border-accent rounded-lg"
                min="0"
              />
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Specialties
            </label>
            <div className="flex flex-wrap gap-2">
              {specialties.map(specialty => (
                <button
                  key={specialty}
                  onClick={() => handleSpecialtyToggle(specialty)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.specialties.includes(specialty)
                      ? 'bg-primary text-white'
                      : 'bg-accent text-secondary hover:bg-secondary hover:text-white'
                  } transition-colors`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Availability
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setFilters({ availability: filters.availability === true ? null : true })
                  onSearch?.()
                }}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filters.availability === true
                    ? 'bg-primary text-white'
                    : 'bg-accent text-secondary hover:bg-secondary hover:text-white'
                } transition-colors`}
              >
                Available Now
              </button>
              <button
                onClick={() => {
                  setFilters({ availability: filters.availability === false ? null : false })
                  onSearch?.()
                }}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filters.availability === false
                    ? 'bg-primary text-white'
                    : 'bg-accent text-secondary hover:bg-secondary hover:text-white'
                } transition-colors`}
              >
                All Photographers
              </button>
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              resetFilters()
              onSearch?.()
            }}
            className="w-full px-4 py-2 mt-4 text-sm text-secondary hover:text-primary transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
