import { cookies } from "next/headers";


export async function POST(request) {
      try {
        cookies().delete('accessToken');
        cookies().delete('refreshToken');
        return Response.json({
            success: true,
            message: 'Logged out successfully'
        })
      } catch(e) {
          return Response.json({
              status: 401,
              success: false,
              error: 'Login out failed'
          })
      
      }
     

}

