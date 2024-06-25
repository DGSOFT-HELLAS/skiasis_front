"use server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { issueAccessToken, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET,SECRET} from "src/utils/jsonwebtoken";
// SERVER ACTION:
export default async function checkAndRefreshToken() {
    const cookieStore = cookies();
    //get tokens:
    const accessToken = cookieStore.get('accessToken');
    const refreshToken = cookieStore.get('refreshToken');

    if (!accessToken && !refreshToken) {
       return {
            success: false,
            error: "No tokens found",
            token: null
       }
    }

    if(!accessToken && refreshToken) {
        //reisue access token:
        const decoded = jwt.verify(refreshToken?.value, REFRESH_TOKEN_SECRET as string) as {clientID: string} 
        if(!decoded) {
           return {
                success: false,
                error: "Invalid refresh token",
                token   : null
           }
        }

        const newAccessToken  = issueAccessToken(decoded.clientID);
        if(!newAccessToken) {
            return {
                success: false,
                error: "Failed to issue new access token",
                token: null
            
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
            message: "Access token reissued",
            success: true,
            token: newAccessToken,
            clientID: decoded.clientID
          }
          
    } 


    if(accessToken && refreshToken) {
        const decodeToken = jwt.verify(accessToken?.value, SECRET as string) as {clientID: string};
        if(!decodeToken) {
            return {
                success: false,
                error: "Invalid access token",
                token: null
            }
        }
        return {
            success: true,
            clientID: decodeToken.clientID, 
            token: accessToken?.value
        }
    }
}