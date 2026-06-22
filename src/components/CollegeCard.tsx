'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface CollegeCardProps {
  college: {
    id: string
    name: string
    location: string
    fees: number
    rating: number
    avgPackage: number
    overview: string
  }
  onSave?: (id: string) => void
  onUnsave?: (id: string) => void
  isSaved?: boolean
}

export default function CollegeCard({ college, onSave, onUnsave, isSaved: initialIsSaved = false }: CollegeCardProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved)

  useEffect(() => {
    setIsSaved(initialIsSaved)
  }, [initialIsSaved])

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        const res = await fetch('/api/saved', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId: college.id })
        })
        if (res.ok) {
          setIsSaved(false)
          onUnsave?.(college.id)
        }
      } else {
        const res = await fetch('/api/saved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId: college.id })
        })
        if (res.ok) {
          setIsSaved(true)
          onSave?.(college.id)
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Link href={`/colleges/${college.id}`} className="group flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {college.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{college.location}</p>
          </Link>
          <button
            onClick={handleSaveToggle}
            className={`p-2 rounded-full transition-all ${
              isSaved ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600">Fees</p>
            <p className="font-semibold text-gray-900">₹{college.fees.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600">Avg Package</p>
            <p className="font-semibold text-gray-900">₹{college.avgPackage.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center col-span-2">
            <p className="text-xs text-gray-600">Rating</p>
            <p className="font-semibold text-gray-900">⭐ {college.rating}/5</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{college.overview}</p>

        <div className="flex items-center justify-between">
          <Link
            href={`/colleges/${college.id}`}
            className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}