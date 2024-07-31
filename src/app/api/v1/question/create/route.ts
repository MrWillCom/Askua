import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isCuid } from '@paralleldrive/cuid2'
import isAuthorized, { unauthorizedResponse } from '@/utils/isAuthorized'

export async function POST(request: NextRequest) {
  if (isAuthorized(request)) {
    const formData = await request.formData()
    const content = formData.get('content')
    const boxId = formData.get('boxId')

    if (typeof content !== 'string') {
      return Response.json(
        { error: 'Given `content` is not a string.' },
        { status: 400 },
      )
    }

    if (typeof boxId === 'string' ? !isCuid(boxId) : true) {
      return Response.json(
        { error: 'Given `boxId` is invalid.' },
        { status: 400 },
      )
    }

    try {
      const box = await prisma.box.findUniqueOrThrow({
        where: { id: boxId as string },
      })

      if (box.open === false) {
        return Response.json({ error: 'The box is closed.' }, { status: 400 })
      } else {
        const question = await prisma.question.create({
          data: { content, boxId: boxId as string },
          include: { box: true },
        })

        return Response.json(question, { status: 200 })
      }
    } catch (error) {
      if (
        (error as any)?.code === 'P2003' ||
        (error as any)?.code === 'P2025'
      ) {
        return Response.json(
          { error: "There isn't any Box matching the given `boxId`." },
          { status: 400 },
        )
      }

      console.error(error)
      return Response.json(
        { error: 'Unhandled error happened on server-side.' },
        { status: 500 },
      )
    }
  } else {
    return unauthorizedResponse
  }
}
