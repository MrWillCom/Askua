import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isCuid } from '@paralleldrive/cuid2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import isAuthorized, { unauthorizedResponse } from '@/utils/isAuthorized'

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams
  const id = searchParams.get('id')
  const identifier = searchParams.get('identifier')

  if (
    (typeof id === 'string' ? !isCuid(id) : true) &&
    typeof identifier !== 'string'
  ) {
    return Response.json(
      { error: 'Both `id` and `identifier` are invalid.' },
      { status: 400 },
    )
  }

  try {
    const box = await prisma.box.findUniqueOrThrow({
      where: { id: id ?? undefined, identifier: identifier ?? undefined },
      include: {
        questions: { select: { id: true }, orderBy: { createdAt: 'desc' } },
      },
    })

    if (box.public === false && isAuthorized(request) === false) {
      return unauthorizedResponse
    }

    return Response.json(box, { status: 200 })
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code === 'P2025') {
      return Response.json(
        {
          error: "There isn't any Box matching the given `id` or `identifier`.",
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
}
