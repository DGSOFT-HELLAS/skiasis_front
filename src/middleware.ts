import {  NextResponse  } from "next/server";
import { cookies } from 'next/headers'
import { ref } from "yup";
export async function middleware(req: NextResponse ) {
  const cookieStore = cookies();
  const refreshToken =  cookieStore.get("refreshToken");
  if(!refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
