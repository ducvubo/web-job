import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const authPaths = ['/auth/company/login']
const adminPaths = ['/dashboard/admin/company']
const privatePatchCompany = ['/dashboard/company']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const access_token = request.cookies.get('access_token')?.value
  const refresh_token = request.cookies.get('refresh_token')?.value
  const cp_access_token = request.cookies.get('cp_access_token')?.value
  const cp_refresh_token = request.cookies.get('cp_refresh_token')?.value

  // if (adminPaths.some((path) => pathname.startsWith(path)) && access_token && refresh_token) {
  //   return NextResponse.redirect(new URL('/dashboard/admin/company', request.url))
  // }

  // if (adminPaths.some((path) => pathname.startsWith(path)) && !access_token && !refresh_token) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  if (authPaths.some((path) => pathname.startsWith(path)) && cp_access_token && cp_refresh_token) {
    return NextResponse.redirect(new URL('/dashboard/company', request.url))
  }

  if (privatePatchCompany.some((path) => pathname.startsWith(path)) && !cp_access_token && !cp_refresh_token) {
    return NextResponse.redirect(new URL('/auth/company/login', request.url))
  }

  // if (pathname.match(productEditRegex) && !sessionToken) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/company', '/dashboard/:path*', '/auth/company/login']
}
