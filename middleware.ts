import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname)
    const pathName = request.nextUrl.pathname
    const isPublicPath =  pathName === '/login' || pathName === '/signup';
    const token = request.cookies.get("accessToken")
    const urlRegex = /\?id=\d+$/;
    const isMatch = urlRegex.test(request.nextUrl.search);
    const referer = request.headers.get('referer');


    if (!isMatch) {
        const referer = request.headers.get('referer');
        if (referer) {
          return NextResponse.redirect(new URL(referer));
        } else {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/users/userDetails',
    '/dashboard/GroupUsers'

  ],
}