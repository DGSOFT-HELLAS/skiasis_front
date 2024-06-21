"use server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { issueAccessToken, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from "src/utils/jsonwebtoken";
// SERVER ACTION:
export default async function checkAndRefreshToken() {
    const cookieStore = cookies();
    //get tokens:
    const accessToken = cookieStore.get('accessToken');
    const refreshToken = cookieStore.get('refreshToken');
    console.log({REFRESH_TOKEN_SECRET})
    console.log({accessToken})
    if (!accessToken && !refreshToken) {
        return Response.json({
            message: 'Access token or refresh token not found',
            status: 401,
        })
    }

    if(!accessToken && refreshToken) {
        //reisue access token:
        const decoded = jwt.verify(refreshToken?.value, REFRESH_TOKEN_SECRET) as {clientID: string} 
        console.log({decoded})
        if(!decoded) {
            return Response.json({
                error: 'Decoded token not found',
                status: 401,
            })
        }

        const newAccessToken  = issueAccessToken(decoded.clientID);
        console.log({newAccessToken})
        if(!newAccessToken) {
            return Response.json({
                error: 'Access token not issued',
                status: 401,
            })
        }
        cookies().set({
            maxAge: ACCESS_TOKEN_EXPIRES_IN, 
            name: "accessToken",
            value: newAccessToken,
            httpOnly: true,
            path: "/",
          });

    }
}