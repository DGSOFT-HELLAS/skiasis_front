import axios from 'axios';
import translateData from 'src/utils/translateData';
import { issueAccessToken, issueRefreshToken } from 'src/utils/jsonwebtoken';
import { cookies } from "next/headers";
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'src/utils/jsonwebtoken';
// Define a schema for the request body

export async function POST(request, response) {
  const { token } = await request.json();
  return Response.json({
    status: 200,
    data: 'test'
  })
}


