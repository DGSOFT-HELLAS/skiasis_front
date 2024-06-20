
import { cookies } from 'next/headers'

export async function POST(request) {
    const cookieStore = cookies()
  const token = cookieStore.get('accessToken')

    //get cookies here from next cookies
    return Response.json({
        status: 200,
        data: [
            {title: 'Event 1', date: '2022-01-01'},
            {title: 'Event 2', date: '2022-01-02'},
        ]
    })

}