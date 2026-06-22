'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface College {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  avgPackage: number
  overview: string
  courses: string
  placements: string
  reviews: Array<{
    id: string
    userName: string
    comment: string
    rating: number
  }>
}

export default function CollegeDetail() {
  const params = useParams()
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchCollege()
      checkSaved()
    }
  }, [params.id])

  const fetchCollege = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/colleges/${params.id}`)
      if (!res.ok) throw new Error('College not found')
      const data = await res.json()
      setCollege(data)
    } catch (err) {
      setError('Failed to load college details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const checkSaved = async () => {
    try {
      const res = await fetch('/api/saved')
      if (res.ok) {
        const data = await res.json()
        setIsSaved(data.some((s: any) => s.collegeId === params.id))
      }
    } catch (error) {
      console.error('Error checking saved:', error)
    }
  }

  const toggleSave = async () => {
    if (!college) return
    try {
      if (isSaved) {
        const res = await fetch('/api/saved', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId: college.id })
        })
        if (res.ok) setIsSaved(false)
      } else {
        const res = await fetch('/api/saved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId: college.id })
        })
        if (res.ok) setIsSaved(true)
      }
    } catch (error) {
      console.error('Error toggling save:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-8 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-red-600 text-lg">{error || 'College not found'}</p>
            <Link href="/" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-block mb-6 text-blue-600 hover:text-blue-800">
          ← Back to Colleges
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{college.name}</h1>
                <p className="text-gray-600 mt-1">{college.location}</p>
              </div>
              <button
                onClick={toggleSave}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isSaved ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isSaved ? '❤️ Saved' : '🤍 Save'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Fees</p>
                <p className="text-xl font-bold text-gray-900">₹{college.fees.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Avg Package</p>
                <p className="text-xl font-bold text-gray-900">₹{college.avgPackage.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-xl font-bold text-gray-900">⭐ {college.rating}/5</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Overview</h2>
              <p className="text-gray-600">{college.overview}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Courses</h2>
              <p className="text-gray-600">{college.courses}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Placements</h2>
              <p className="text-gray-600">{college.placements}</p>
            </div>

            {/* ✅ REVIEWS SECTION - YEH ADD KARO */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Student Reviews</h2>
              {college.reviews && college.reviews.length > 0 ? (
                <div className="space-y-4">
                  {college.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{review.userName}</p>
                          <p className="text-sm text-gray-500">Student</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500">⭐</span>
                          <span className="ml-1 font-medium">{review.rating}</span>
                          <span className="text-gray-400 ml-1">/ 5</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 bg-gray-50 rounded-lg p-4 text-center">
                  No reviews yet. Be the first to review this college!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}