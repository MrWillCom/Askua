import { NextRequest } from 'next/server'
import prisma from '@/utils/db'

export async function GET(request: NextRequest) {
  const boxes = await prisma.box.findMany({
    include: { questions: { select: { id: true } } },
  })

  return Response.json(boxes, { status: 200 })
}
