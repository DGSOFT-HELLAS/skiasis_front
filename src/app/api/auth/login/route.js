import axios from 'axios';
import translateData from 'src/utils/translateData';
import { issueAccessToken, issueRefreshToken } from 'src/utils/jsonwebtoken';
import { cookies } from "next/headers";
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'src/utils/jsonwebtoken';
// Define a schema for the request body

export async function POST(request, response) {
  const { password, username } = await request.json();

  if (username === 'demo' && password === '1234') {
    const clientID = '123456789'; // Example authenticated client ID

    try {
      // Issue tokens
      const accessToken = issueAccessToken(clientID);
      console.log({accessToken})
      const refreshToken = issueRefreshToken();
      // Return success response with tokens
      cookies().set({
        maxAge: ACCESS_TOKEN_EXPIRES_IN, 
        name: "accessToken",
        value: accessToken,
        httpOnly: true,
        path: "/",
      });
      cookies().set({
        maxAge: REFRESH_TOKEN_EXPIRES_IN, // 15 minutes expiration (in milliseconds)
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        path: "/",
      });
  
  
      return Response.json({
        status: 200,
        user: {
          username: 'Giannis Chiout',
          role: "admin",
        }
      });
    } catch (e) {
      return Response.json({
        status: 401,
        error: 'Authentication failed',
      });
    }
  } else {
    return Response.json({
      status: 401,
      error: 'Invalid credentials',
    });
  }




  // const loginClientID = await softoneLogin(password, username);

  // if (!loginClientID) {
  //   return Response.json({
  //     status: 401,
  //     error: 'Authentication failed with authenticated client ID',
  //   });
  // }

  // const authenticatedClientID = await softoneAuthenticate(loginClientID);
  // if (!authenticatedClientID) {
  //   return Response.json({
  //     status: 401,
  //     error: 'Authentication failed with authenticated client ID',
  //   });
  // }

  // const user = await getUser(authenticatedClientID);
  // if (!user) {
  //   return Response.json({
  //     status: 401,
  //     error: 'User not found',
  //   });
  // }
  // // Return success response with user data
  // return Response.json({
  //   status: 200,
  //   data: user,
  // });
}

async function softoneLogin(password, username) {
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

async function softoneAuthenticate(clientID) {
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

async function getUser(clientID) {
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
    // Assuming translateData returns an array of UserResponse
    return buffer[0];
  } catch (e) {
    return null;
  }
}
