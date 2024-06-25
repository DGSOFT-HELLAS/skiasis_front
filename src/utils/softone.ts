import translateData from './translateData';

export async function fetchEvents(start: string, end: string, token: any) {
  try {
    const result = await fetch(`${process.env.SOFTONE_FULLURL}.getMeetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: start,
        end: end,
        clientID: token,
      }),
    });
    const buffer = await translateData(result);
    return {
      success: true,
      result: buffer.data,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}

export async function fetchSingleEvent(soaction: string, clientID: any) {
  try {
    const result = await fetch(`${process.env.SOFTONE_FULLURL}.getMeetingInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: clientID,
        SOACTION: soaction,
      }),
    });
    const buffer = await translateData(result);
    return {
      success: true,
      result: buffer[0],
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}

export async function getBasicItem(clientId: any) {
  try {
    const result = await fetch(`${process.env.SOFTONE_FULLURL}.getBasicItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: clientId,
      }),
    });

    const buffer = await translateData(result);
    return {
      success: true,
      result: buffer,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}
export async function getBasicItemAttribute(clientId: any, id: string) {
  console.log({clientId, id})
  try {
    const result = await fetch(`${process.env.SOFTONE_FULLURL}.getBasicItemAttribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: clientId,
        id: id
      }),
    });
    const buffer = await translateData(result);
    return {
      success: true,
      result: buffer,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}
