import { startOfYear, endOfYear, format } from 'date-fns';
import checkAndRefreshToken from 'src/app/actions/isValidToken';
import { fetchEvents, fetchSingleEvent } from 'src/utils/softone';

export async function POST(req: Request) {

  const tokenResponse = await checkAndRefreshToken();
  const clientID = tokenResponse?.clientID;
  if (!tokenResponse?.success) {
    return Response.json({
      status: 401,
      message: 'Unauthorized',
      error:tokenResponse?.error,
    });
  }

  const now = new Date();
  // Get the start of the year
  const startOfTheYear = startOfYear(now);
  const endOfTheYear = endOfYear(now);
  const formattedStartOfTheYear = format(startOfTheYear, 'yyyyMMdd');
  const formattedEndOfTheYear = format(endOfTheYear, 'yyyyMMdd');

 
  
  try {
      const softone = await fetchEvents(formattedStartOfTheYear, formattedEndOfTheYear, clientID);
      if (!softone.success) throw new Error(softone.error?.message);
      return Response.json({
        status: 200,
        message: 'success',
        result: softone.result
      })
  } catch(e) {
    return Response.json({
      status: 500,
      message: 'Internal Server Error',
      error: e.message,
    });
  }
  
}


export async function GET(request:Request) {
  const tokenResponse = await checkAndRefreshToken();
  const clientID = tokenResponse?.clientID;
  if (!tokenResponse?.success) {
    return Response.json({
      status: 401,
      message: 'Unauthorized',
      error:tokenResponse?.error,
    });
  }
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') as string
 
  try {
    const event = await fetchSingleEvent(id, clientID)
    return Response.json({
      status: 200,
      message: 'success',
      result: event.result,
    })
  } catch(e) {
    return Response.json({
      status: 500,
      message: 'Internal Server Error',
      error: e.message,
    });
  }

}
