"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface SearchFilters {
  query: string
  priceRange: [number, number]
  specialties: string[]
  availability: boolean | null
  sortBy: 'rating' | 'price_low' | 'price_high' | 'reviews' | null
  location: string | null
}

interface SearchContextType {
  filters: SearchFilters
  setFilters: (filters: Partial<SearchFilters>) => void
  resetFilters: () => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const defaultFilters: SearchFilters = {
  query: '',
  priceRange: [0, 1000],
  specialties: [],
  availability: null,
  sortBy: null,
  location: null,
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFiltersState] = useState<SearchFilters>(defaultFilters)
  const [isLoading, setIsLoading] = useState(false)

  const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters)
  }, [])

  return (
    <SearchContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
