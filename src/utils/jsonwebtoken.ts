import jwt from 'jsonwebtoken';
//SECRETS:
const SECRET = process.env.JWT_SECRET || 'secret';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
//EXPIRIES:
export const ACCESS_TOKEN_EXPIRES_IN = 200; // 15 minutes
export const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days 
// Function to issue an access token
export function issueAccessToken(clientID: string): string {
  return jwt.sign({ clientID }, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN }); // Token expires in 15 minutes
}

// Function to issue a refresh token
export function issueRefreshToken(): string {
  return jwt.sign({}, SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN }); // Refresh token expires in 7 days
}

// Function to validate and decode the access token
export function validateAccessToken(token: string): { clientID: string } | null {
  try {
    const decoded = jwt.verify(token, SECRET) as { clientID: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export function validateRefreshToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    return decoded; // Returns the decoded payload if token is valid
  } catch (error) {
    return null; // Return null or handle the error as per your application's needs
  }
}