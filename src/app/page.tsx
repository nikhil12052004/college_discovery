'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CollegeCard from '@/components/CollegeCard'
import SearchFilters from '@/components/SearchFilters'

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
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [savedColleges, setSavedColleges] = useState<string[]>([])
  const [compareList, setCompareList] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchColleges()
    fetchSaved()
    loadCompareList()
  }, [])

  const fetchColleges = async (filters?: { search: string; location: string; minRating: number }) => {
    setLoading(true)
    setError(null)
    try {
      let url = '/api/colleges'
      if (filters) {
        const params = new URLSearchParams()
        if (filters.search) params.append('search', filters.search)
        if (filters.location) params.append('location', filters.location)
        if (filters.minRating) params.append('minRating', filters.minRating.toString())
        url += `?${params.toString()}`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch colleges')
      const data = await res.json()
      setColleges(data)
    } catch (err) {
      setError('Failed to load colleges. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSaved = async () => {
    try {
      const res = await fetch('/api/saved')
      if (res.ok) {
        const data = await res.json()
        setSavedColleges(data.map((s: any) => s.collegeId))
      }
    } catch (error) {
      console.error('Error fetching saved:', error)
    }
  }

  const loadCompareList = () => {
    try {
      const saved = localStorage.getItem('compareColleges')
      if (saved) {
        setCompareList(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Error loading compare list:', e)
    }
  }

  const handleSave = (id: string) => {
    setSavedColleges(prev => [...prev, id])
  }

  const handleUnsave = (id: string) => {
    setSavedColleges(prev => prev.filter(sid => sid !== id))
  }

  const toggleCompare = (id: string) => {
    let updated: string[]
    if (compareList.includes(id)) {
      updated = compareList.filter(cid => cid !== id)
    } else {
      if (compareList.length >= 3) {
        alert('You can compare maximum 3 colleges at a time')
        return
      }
      updated = [...compareList, id]
    }
    setCompareList(updated)
    localStorage.setItem('compareColleges', JSON.stringify(updated))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">College Discovery</h1>
            <p className="text-gray-600 mt-1">Find and compare the best colleges</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/compare"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                compareList.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={(e) => compareList.length === 0 && e.preventDefault()}
            >
              Compare ({compareList.length}/3)
            </Link>
            <Link
              href="/saved"
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Saved ❤️
            </Link>
          </div>
        </div>

        <SearchFilters onSearch={fetchColleges} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-16 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No colleges found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div key={college.id} className="relative">
                <CollegeCard
                  college={college}
                  onSave={handleSave}
                  onUnsave={handleUnsave}
                  isSaved={savedColleges.includes(college.id)}
                />
                <button
                  onClick={() => toggleCompare(college.id)}
                  className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    compareList.includes(college.id)
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {compareList.includes(college.id) ? 'Remove from Compare' : 'Add to Compare'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}