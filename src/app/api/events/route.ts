
import checkAndRefreshToken from 'src/app/actions/isValidToken'
export async function POST(request: Request) {
    // const {startData, endDate} = await request.json()
    console.log('calendar event')
    await checkAndRefreshToken();
    return Response.json({
        status: 200,
        message: 'success',
    })

  }