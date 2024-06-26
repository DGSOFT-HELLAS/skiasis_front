// Import required types and functions
import { cookies } from 'next/headers';
import { issueAccessToken, validateRefreshToken, ACCESS_TOKEN_EXPIRES_IN, } from 'src/utils/jsonwebtoken';

// Define the types for tokens
interface Token {
    value: string; // Assuming your token values are strings
}

// Define the types for cookieStore
interface CookieStore {
    get: (name: string) => Token | undefined;
    set: (options: { maxAge: number; name: string; value: string; httpOnly: boolean; path: string; }) => void;
}

// Define the function with async and TypeScript types
export default async function validateToken() {
    const cookieStore: CookieStore = cookies(); // Ensure correct typings for cookies()

    const refreshToken: Token | undefined = cookieStore.get("refreshToken");
    const accessToken: Token | undefined = cookieStore.get("accessToken");

    // Ensure refreshToken and accessToken are strings
    const refreshTokenValue: string | null = refreshToken?.value || null;
    const accessTokenValue: string | null = accessToken?.value || null;


    //REFRESH TOKEN EXISTS: 
    if (refreshTokenValue && !accessTokenValue) {
        const validatedToken = validateRefreshToken(refreshTokenValue);
        if (validatedToken) {
            const newAccessToken = issueAccessToken(validatedToken?.clientID, ACCESS_TOKEN_EXPIRES_IN);
            console.log({ newAccessToken });

            // Set the new access token cookie
            cookieStore.set({
                maxAge: ACCESS_TOKEN_EXPIRES_IN,
                name: "accessToken",
                value: newAccessToken,
                httpOnly: true,
                path: "/",
            });
        }
    }
    //
}
