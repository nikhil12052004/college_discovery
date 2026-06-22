import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    console.log('🔍 Searching for ID:', id)
    
    // ✅ REVIEWS BHI INCLUDE KARO
    const college = await prisma.college.findUnique({
      where: { id: id },
      include: {
        reviews: true  // ✅ YEH LINE ADD KARO
      }
    })

    console.log('✅ College found:', college ? 'Yes' : 'No')
    console.log('📝 Reviews count:', college?.reviews?.length || 0)

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(college)
  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch college' },
      { status: 500 }
    )
  }
}