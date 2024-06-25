import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'


export async function middleware(request) {
  const cookieStore = cookies()

  const token = cookieStore.get('refreshToken')
  const userCookie = cookieStore.get('user') 
  const user = JSON.parse(userCookie?.value)

  // const { pathname }: { pathname: string } = request.nextUrl;
  const { pathname } = request.nextUrl;

  //get the url path:
  if(!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  } 
  
  if(user?.role === 'Measurer' && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  // matcher: "/dashboard/:path*",
  matcher: "/dashboard/:path*",
};
