import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isCuid } from '@paralleldrive/cuid2'
import isAuthorized from '@/utils/isAuthorized'

export async function GET(request: NextRequest) {
  let boxId = new URL(request.url).searchParams.get('boxId')
  let isReplied: string | boolean | null = new URL(
    request.url,
  ).searchParams.get('isReplied')

  if (typeof boxId === 'string' && boxId.length > 0) {
    if (!isCuid(boxId)) {
      return Response.json(
        { error: 'Given `boxId` is invalid.' },
        { status: 400 },
      )
    }
  } else {
    boxId = null
  }

  if (isReplied === 'true') {
    isReplied = true
  } else if (isReplied === 'false') {
    isReplied = false
  } else if (isReplied !== null && isReplied.length > 0) {
    return Response.json(
      { error: 'Given `isReplied` is invalid.' },
      { status: 400 },
    )
  }

  const authorized = isAuthorized(request)

  try {
    const questions = await prisma.question.findMany({
      where: {
        boxId: boxId ?? undefined,
        repliedAt:
          typeof isReplied === 'boolean'
            ? isReplied
              ? { not: null }
              : null
            : undefined,
        public: authorized ? undefined : true,
      },
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
