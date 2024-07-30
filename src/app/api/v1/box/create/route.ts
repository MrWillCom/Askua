import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isAuthorized, unauthorizedResponse } from '@/utils/isAuthorized'

export async function POST(request: NextRequest) {
  if (isAuthorized(request)) {
    const formData = await request.formData()
    const identifier = formData.get('identifier')
    const name = formData.get('name')

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

    if (typeof name === 'string' || name === null) {
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

        console.error(error)
        return Response.json(
          { error: 'Unhandled error happened on server-side.' },
          { status: 500 },
        )
      }
    } else {
      return Response.json(
        { error: 'Given `name` is not a string.' },
        { status: 400 },
      )
    }
  } else {
    return unauthorizedResponse
  }
}
