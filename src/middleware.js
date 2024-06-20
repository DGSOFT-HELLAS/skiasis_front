import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
export async function middleware(request) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  //get the url path:
  if(!accessToken) {
    console.log({accessToken})
    //issue here a new access token based on the refresh tokens validation:
    //without performing an axios request:
    // const refreshToken = cookieStore.get('refreshToken')
    // let validate = validateRefreshToken(refreshToken)
    // console.log({validate})
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
