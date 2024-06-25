import axios from 'axios';
import translateData from 'src/utils/translateData';
import { issueAccessToken, issueRefreshToken } from 'src/utils/jsonwebtoken';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'src/utils/jsonwebtoken';
import { json } from 'stream/consumers';
// Define a schema for the request body

export async function POST(request: Request, response: Response) {
  const { password, username } = await request.json();

    try {
      const loginClientID = await softoneLogin(password, username);

      if (!loginClientID) {
        return Response.json({
          status: 401,
          error: 'Authentication failed with authenticated client ID',
        });
      }

      const clientID = await softoneAuthenticate(loginClientID);
      if (!clientID ) {
        return Response.json({
          status: 401,
          error: 'Authentication failed with authenticated client ID',
        });
      }

      const softoneUser = await getUser(clientID);
      const user = {
        username: softoneUser.NAME,
        role: softoneUser.WEBGROUPNAME,
      }
      if (!softoneUser) {
        return Response.json({
          status: 401,
          error: 'User not found',
        });
      }
      // Issue tokens
      const accessToken = issueAccessToken(clientID);
      const refreshToken = issueRefreshToken(clientID);
      // Return success response with tokens
      cookies().set({
        maxAge: ACCESS_TOKEN_EXPIRES_IN,
        name: 'accessToken',
        value: accessToken,
        httpOnly: true,
        path: '/',
      });
      cookies().set({
        maxAge: REFRESH_TOKEN_EXPIRES_IN, 
        name: 'refreshToken',
        value: refreshToken,
        httpOnly: true,
        path: '/',
      });
      cookies().set({
        maxAge: REFRESH_TOKEN_EXPIRES_IN, 
        name: 'user',
        value: JSON.stringify(user),
        path: '/',
      });

      return Response.json({
        status: 200,
        success: true,
        user,
        
      });
    } catch (e) {
      return Response.json({
        status: 401,
        error: 'Authentication failed',
      });
    }


}

async function softoneLogin(password: string, username: string) {
  try {
    const { data } = await axios.post(`${process.env.SOFT_URL}`, {
      service: 'Login',
      username: username.trim(),
      password: password.trim(),
      appId: '1001',
    });
    return data.clientID;
  } catch (e) {
    return null;
  }
}

async function softoneAuthenticate(clientID: string) {
  try {
    const { data } = await axios.post(`${process.env.SOFT_URL}`, {
      service: 'authenticate',
      clientID: clientID,
      COMPANY: '1001',
      BRANCH: '1000',
      MODULE: '0',
      REFID: '262',
    });

    return data.clientID;
  } catch (e) {
    return null;
  }
}

async function getUser(clientID: string) {
  try {
    const response = await fetch(`${process.env.SOFT_URL}/JS/Production/calls.getUser`, {
      method: 'POST',
      body: JSON.stringify({
        clientId: clientID,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const buffer = await translateData(response);
    return buffer[0];
  } catch (e) {
    return null;
  }
}
