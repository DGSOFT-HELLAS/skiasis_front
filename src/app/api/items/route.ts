import { startOfYear, endOfYear, format } from 'date-fns';
import checkAndRefreshToken from 'src/app/actions/isValidToken';
import { getBasicItem, getBasicItemAttribute } from 'src/utils/softone';

export async function POST(req: Request) {
  const body = await req.json();
  const tokenResponse = await checkAndRefreshToken();
  const clientID = tokenResponse?.clientID;
  if (!tokenResponse?.success) {
    return Response.json({
      status: 401,
      message: 'Unauthorized',
      error:tokenResponse?.error,
    });
  }

  if(body?.type === "getBasicItem") {
    try {
      const items = await getBasicItem(clientID);
      if (!items.success) throw new Error(items.error?.message);
      return Response.json({
        status: 200,
        message: 'success',
        result: items.result
      })
    } catch(e) {
      return Response.json({
        status: 500,
        message: 'Internal Server Error',
        error: e.message,
      });
    }
  } 
  if(body?.type === "getBasicItemAttr") {
    console.log('here')
    const id = body?.id;
    try {
      const itemsAttr = await getBasicItemAttribute(clientID, id);
      if (!itemsAttr.success) throw new Error(itemsAttr.error?.message);
      return Response.json({
        status: 200,
        message: 'success',
        result: itemsAttr.result
      })
    } catch(e) {
      return Response.json({
        status: 500,
        message: 'Internal Server Error',
        error: e.message,
      });
    }
  } 
  
}






