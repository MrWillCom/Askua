import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isAuthorized, unauthorizedResponse } from '@/utils/isAuthorized'
import { isCuid } from '@paralleldrive/cuid2'
import type { Prisma } from '@prisma/client'

export async function PUT(request: NextRequest) {
  if (isAuthorized(request)) {
    const formData = await request.formData()
    const id = formData.get('id')
    const identifier = formData.get('identifier')
    const name = formData.get('name')
    let open = formData.get('open')
    let _public = formData.get('public')
    const description = formData.get('description')

    if (
      (typeof id === 'string' ? !isCuid(id) : true) &&
      typeof identifier !== 'string'
    ) {
      return Response.json(
        { error: 'Both `id` and `identifier` are invalid.' },
        { status: 400 },
      )
    }

    let modifications = {}

    if (typeof identifier === 'string' && /[a-zA-Z0-9_-]+/g.test(identifier)) {
      modifications = { ...modifications, identifier }
    }

    if (typeof name === 'string') {
      modifications = { ...modifications, name }
    }

    if (open !== null) {
      if (typeof open !== 'string' || (open !== 'true' && open !== 'false')) {
        return Response.json(
          { error: 'Given `open` is not a boolean.' },
          { status: 400 },
        )
      } else {
        modifications = { ...modifications, open: open === 'true' }
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
        modifications = { ...modifications, public: _public === 'true' }
      }
    }

    if (typeof description === 'string') {
      modifications = { ...modifications, description }
    }

    try {
      const newBox = await prisma.box.update({
        where: {
          id: id ?? undefined,
          identifier: identifier ?? undefined,
        } as Prisma.BoxWhereUniqueInput,
        data: modifications,
        include: {
          questions: { select: { id: true }, orderBy: { createdAt: 'desc' } },
        },
      })

      return Response.json(newBox, { status: 200 })
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
