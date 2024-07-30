import { NextRequest } from 'next/server'

const isAuthorized = (request: Request | NextRequest) => {
  const receivedSecret = request.headers
    .get('Authorization')
    ?.split('Bearer ')[1]
  const SECRET = process.env.SECRET

  if (typeof receivedSecret === 'string' && receivedSecret === SECRET) {
    return true
  }
  return false
}

const unauthorizedResponse = Response.json(
  { error: 'Unauthorized.' },
  { status: 401 },
)

export default isAuthorized
export { isAuthorized, unauthorizedResponse }
