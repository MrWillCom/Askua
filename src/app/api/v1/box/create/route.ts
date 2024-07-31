import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isAuthorized, unauthorizedResponse } from '@/utils/isAuthorized'

export async function POST(request: NextRequest) {
  if (isAuthorized(request)) {
    const formData = await request.formData()
    const identifier = formData.get('identifier')
    const name = formData.get('name')
    const description = formData.get('description')
    let open: FormDataEntryValue | null | boolean = formData.get('open')
    let _public: FormDataEntryValue | null | boolean = formData.get('public')

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

    if (typeof name !== 'string') {
      return Response.json(
        { error: 'Given `name` is not a string.' },
        { status: 400 },
      )
    }

    if (open !== null) {
      if (typeof open !== 'string' || (open !== 'true' && open !== 'false')) {
        return Response.json(
          { error: 'Given `open` is not a boolean.' },
          { status: 400 },
        )
      } else {
        open = open === 'true'
      }
    }

    if (_public !== null) {
      if (
        typeof _public !== 'string' ||
        (_public !== 'true' && _public !== 'false')
      ) {
        return Response.json(
          { error: 'Given `public` is not a boolean.' },
          { status: 400 },
        )
      } else {
        _public = _public === 'true'
      }
    }

    if (description !== null) {
      if (typeof description !== 'string') {
        return Response.json(
          { error: 'Given `description` is not a string.' },
          { status: 400 },
        )
      }
    }

    try {
      const box = await prisma.box.create({
        data: {
          identifier,
          name,
          description,
          open: typeof open === 'boolean' ? open : undefined,
          public: typeof _public === 'boolean' ? _public : undefined,
        },
        include: {
          questions: { select: { id: true }, orderBy: { createdAt: 'desc' } },
        },
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
    return unauthorizedResponse
  }
}
