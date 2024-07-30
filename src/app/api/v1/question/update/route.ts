import { NextRequest } from 'next/server'
import prisma from '@/utils/db'
import { isCuid } from '@paralleldrive/cuid2'

export async function PUT(request: NextRequest) {
  const formData = await request.formData()
  const id = formData.get('id')
  const content = formData.get('content')
  const reply = formData.get('reply')

  if (typeof id === 'string' ? !isCuid(id) : true) {
    return Response.json({ error: 'Given `id` is invalid.' }, { status: 400 })
  }

  try {
    const oldQuestion = await prisma.question.findUniqueOrThrow({
      where: { id: id as string },
    })

    let modifications = {}

    if (typeof content === 'string') {
      modifications = { ...modifications, content }
    }

    if (typeof reply === 'string') {
      if (oldQuestion.repliedAt === null) {
        modifications = { ...modifications, repliedAt: new Date() }
      }
      modifications = { ...modifications, reply }
    }

    const newQuestion = await prisma.question.update({
      where: { id: oldQuestion.id },
      data: modifications,
    })

    return Response.json(newQuestion, { status: 200 })
  } catch (error) {
    if ((error as any)?.code === 'P2003') {
      return Response.json(
        { error: "There isn't any Question matching the given `id`." },
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
