import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import isAuthorized from '@/utils/isAuthorized'

export async function GET(request: NextRequest) {
  const authorized = isAuthorized(request)

  const boxes = await prisma.box.findMany({
    where: authorized ? {} : { public: true },
    include: {
      questions: { select: { id: true }, orderBy: { createdAt: 'desc' } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json(boxes, { status: 200 })
}
