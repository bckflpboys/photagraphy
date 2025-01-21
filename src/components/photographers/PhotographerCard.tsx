"use client"

import Image from 'next/image'
import Link from 'next/link'

interface PhotographerCardProps {
  photographer: {
    id: string
    name: string
    imageUrl: string
    specialties: string[]
    rating: number
    reviewCount: number
    hourlyRate: number
    isOnline: boolean
    location: string
  }
}

export default function PhotographerCard({ photographer }: PhotographerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3]">
        <Image
          src={photographer.imageUrl}
          alt={photographer.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            photographer.isOnline
              ? 'bg-green-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {photographer.isOnline ? 'Active Now' : 'Away'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-dark">{photographer.name}</h3>
          <div className="flex items-center">
            <span className="text-primary">⭐</span>
            <span className="ml-1 text-dark">{photographer.rating}</span>
            <span className="ml-1 text-sm text-secondary">({photographer.reviewCount})</span>
          </div>
        </div>

        <p className="text-secondary text-sm mb-3">
          📍 {photographer.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {photographer.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent rounded-full text-xs text-secondary"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-primary font-semibold">
            ${photographer.hourlyRate}/hr
          </div>
          <Link
            href={`/photographers/${photographer.id}`}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
