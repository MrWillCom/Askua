import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isCuid } from '@paralleldrive/cuid2'

export async function GET(request: NextRequest) {
  const boxId = new URL(request.url).searchParams.get('boxId')

  if (typeof boxId === 'string' ? !isCuid(boxId) : true) {
    return Response.json(
      { error: 'Given `boxId` is invalid.' },
      { status: 400 },
    )
  }

  try {
    const questions = await prisma.question.findMany({
      where: { boxId: boxId as string },
      orderBy: { updatedAt: 'desc' },
    })

    return Response.json(questions, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: 'Unhandled error happened on server-side.' },
      { status: 500 },
    )
  }
}
