import { NextRequest } from 'next/server'
import prisma from '@/utils/db'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const identifier = formData.get('identifier')
  const name = (
    typeof formData.get('name') === 'string' ? formData.get('name') : null
  ) as string | null

  if (typeof identifier !== 'string') {
    return Response.json(
      { error: 'Given `identifier` is not a string.' },
      { status: 400 },
    )
  }

  if (/[a-zA-Z0-9_-]+/g.test(identifier) === false) {
    return Response.json(
      { error: 'Given `identifier` is not valid.' },
      { status: 400 },
    )
  }

  try {
    const box = await prisma.box.create({
      data: { identifier, name },
      include: { questions: true },
    })

    return Response.json(box, { status: 200 })
  } catch (error) {
    if ((error as any)?.code === 'P2002') {
      return Response.json(
        { error: 'Given `identifier` is already in use.' },
        { status: 400 },
      )
    }

    return Response.json(
      { error: 'Unhandled error happened on server-side.' },
      { status: 500 },
    )
  }
}
