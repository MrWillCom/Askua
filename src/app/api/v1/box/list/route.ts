import { NextRequest } from 'next/server'
import prisma from '@/utils/db'

export async function GET(request: NextRequest) {
  const boxes = await prisma.box.findMany()

  return Response.json(boxes, { status: 200 })
}
