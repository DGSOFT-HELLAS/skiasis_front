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
    
    if (!accessToken && !refreshToken) {
       return {
            success: false,
            error: "No tokens found"
       }
    }

    if(!accessToken && refreshToken) {
        //reisue access token:
        const decoded = jwt.verify(refreshToken?.value, REFRESH_TOKEN_SECRET as string) as {clientID: string} 
        if(!decoded) {
           return {
                success: false,
                error: "Invalid refresh token"
           }
        }

        const newAccessToken  = issueAccessToken(decoded.clientID);
        if(!newAccessToken) {
            return {
                success: false,
                error: "Failed to issue new access token"
            
            }
        }
        cookies().set({
            maxAge: ACCESS_TOKEN_EXPIRES_IN, 
            name: "accessToken",
            value: newAccessToken,
            httpOnly: true,
            path: "/",
          });
          return {
            success: true,
            message: "Access token refreshed",
            token: newAccessToken
          }
          
    } else {
        return {
            success: true,
            message: "no action taken"
        }
    }
}