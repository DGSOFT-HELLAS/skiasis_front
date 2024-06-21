import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
export async function middleware(request) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')
  //get the url path:
  if(!refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
