"use client"

import { useState } from 'react'

interface SearchFiltersProps {
  onSearch: (filters: {
    query: string
    priceRange: [number, number]
    specialties: string[]
    availability: boolean | null
  }) => void
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [query, setQuery] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [availability, setAvailability] = useState<boolean | null>(null)

  const specialties = [
    'Portrait', 'Wedding', 'Event', 'Fashion', 
    'Product', 'Real Estate', 'Nature', 'Sports'
  ]

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    )
  }

  const handleSearch = () => {
    onSearch({
      query,
      priceRange: [minPrice, maxPrice],
      specialties: selectedSpecialties,
      availability
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Search Input */}
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search photographers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-accent rounded-lg focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-secondary"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-dark font-semibold mb-2">Price Range (per hour)</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-24 px-2 py-1 border border-accent rounded-lg"
            min="0"
          />
          <span className="text-secondary">to</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24 px-2 py-1 border border-accent rounded-lg"
            min="0"
          />
        </div>
      </div>

      {/* Specialties */}
      <div>
        <h3 className="text-dark font-semibold mb-2">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {specialties.map(specialty => (
            <button
              key={specialty}
              onClick={() => handleSpecialtyToggle(specialty)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedSpecialties.includes(specialty)
                  ? 'bg-primary text-white'
                  : 'bg-accent text-secondary hover:bg-secondary hover:text-white'
              } transition-colors`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="text-dark font-semibold mb-2">Availability</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setAvailability(availability === true ? null : true)}
            className={`px-4 py-2 rounded-lg text-sm ${
              availability === true
                ? 'bg-primary text-white'
                : 'bg-accent text-secondary hover:bg-secondary hover:text-white'
            } transition-colors`}
          >
            Available Now
          </button>
          <button
            onClick={() => setAvailability(availability === false ? null : false)}
            className={`px-4 py-2 rounded-lg text-sm ${
              availability === false
                ? 'bg-primary text-white'
                : 'bg-accent text-secondary hover:bg-secondary hover:text-white'
            } transition-colors`}
          >
            All Photographers
          </button>
        </div>
      </div>
    </div>
  )
}
