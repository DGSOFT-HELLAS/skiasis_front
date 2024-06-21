
import { cookies } from 'next/headers'
import checkAndRefreshToken from 'src/app/actions/isValidToken'

export async function POST(request) {

    checkAndRefreshToken();

    //get cookies here from next cookies
    return Response.json({
        status: 200,
        data: [
            {title: 'Event 1', date: '2022-01-01'},
            {title: 'Event 2', date: '2022-01-02'},
        ]
    })

}