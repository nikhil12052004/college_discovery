import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DEMO_EMAIL = 'demo@gmail.com'

export async function GET() {
  try {
    const saved = await prisma.savedCollege.findMany({
      where: { userEmail: DEMO_EMAIL },
      include: { college: true }
    })
    return NextResponse.json(saved)
  } catch (error) {
    console.error('Error fetching saved:', error)
    return NextResponse.json(
      { error: 'Failed to fetch saved colleges' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { collegeId } = await request.json()

    const saved = await prisma.savedCollege.create({
      data: {
        userEmail: DEMO_EMAIL,
        collegeId
      }
    })

    return NextResponse.json(saved)
  } catch (error) {
    console.error('Error saving college:', error)
    return NextResponse.json(
      { error: 'Failed to save college' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { collegeId } = await request.json()

    await prisma.savedCollege.delete({
      where: {
        userEmail_collegeId: {
          userEmail: DEMO_EMAIL,
          collegeId
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error unsaving college:', error)
    return NextResponse.json(
      { error: 'Failed to unsave college' },
      { status: 500 }
    )
  }
}