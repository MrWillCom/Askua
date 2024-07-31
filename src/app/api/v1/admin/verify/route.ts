import isAuthorized from '@/utils/isAuthorized'
import { NextRequest } from 'next/server'

export function POST(request: NextRequest) {
  const authorized = isAuthorized(request)

  return Response.json({ authorized }, { status: 200 })
}
