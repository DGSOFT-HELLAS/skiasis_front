import { cookies } from "next/headers";


export async function POST(request, response) {
      try {
        cookies().delete('accessToken');
        cookies().delete('refreshToken');
        return Response.json({
            status: 200,
            message: 'Logged out successfully'
        })
      } catch(e) {
          return Response.json({
              status: 401,
              error: 'Login out failed'
          })
      
      }
     

}

