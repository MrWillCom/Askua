import { auth } from '@/auth'

export default auth(request => {
  const pathname = request.nextUrl.pathname
  const isProtected = ['/settings'].some(v => pathname.startsWith(v))

  if (!request.auth && isProtected) {
    return Response.redirect(new URL('/sign-in', request.nextUrl.origin))
  }
})
