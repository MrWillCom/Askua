import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isCuid } from '@paralleldrive/cuid2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import isAuthorized, { unauthorizedResponse } from '@/utils/isAuthorized'

export async function DELETE(request: NextRequest) {
  if (isAuthorized(request)) {
    const searchParams = new URL(request.url).searchParams
    const id = searchParams.get('id')

    if (typeof id === 'string' ? !isCuid(id) : true) {
      return Response.json({ error: 'Given `id` is invalid.' }, { status: 400 })
    }

    try {
      const question = await prisma.question.delete({
        where: { id: id ?? undefined },
      })

      return Response.json(question, { status: 200 })
    } catch (error) {
      if ((error as PrismaClientKnownRequestError).code === 'P2025') {
        return Response.json(
          {
            error: "There isn't any Question matching the given `id`.",
          },
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
