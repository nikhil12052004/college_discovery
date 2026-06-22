import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const minRating = searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : 0

    const where: any = {
      rating: { gte: minRating }
    }

    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }

    const colleges = await prisma.college.findMany({
      where,
      include: {
        reviews: {
          take: 3,
          orderBy: { id: 'desc' }
        }
      }
    })

    return NextResponse.json(colleges)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 })
  }
}