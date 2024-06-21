
import checkAndRefreshToken from 'src/app/actions/isValidToken'
export async function POST(req: Request) {
    const {startDate, endDate} = await req.json()
    let token = await checkAndRefreshToken();
    if(!token?.success) {
        return Response.json({
            status: 401,
            message: "Unauthorized",
            error: token?.error
        })
    }
 

    return Response.json({
        status: 200,
        message: 'success',
        result: [
            {
                start: '2024-06-21T09:00:00',
                end: '2024-06-21T10:00:00',
                title: 'Meeting with Bob',
                description: 'Discuss project updates and next steps.',
                extendedProps: {
                  location: 'Conference Room A',
                  attendees: ['Alice', 'Bob', 'Charlie'],
                  priority: 'High',
                },
              },
              {
                start: '2024-06-21T11:00:00',
                end: '2024-06-21T12:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T11:30:00',
                end: '2024-06-21T12:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T11:30:00',
                end: '2024-06-21T12:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-21T14:30:00',
                end: '2024-06-21T15:00:00',
                title: 'Lunch with Sarah',
                description: 'Casual lunch to discuss marketing strategies.',
                extendedProps: {
                  location: 'Cafeteria',
                  attendees: ['Sarah'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-22T14:00:00',
                end: '2024-06-22T15:00:00',
                title: 'Team Sync',
                description: 'Weekly sync-up with the development team.',
                extendedProps: {
                  location: 'Zoom',
                  attendees: ['Dev Team'],
                  priority: 'Low',
                },
              },
              {
                start: '2024-06-23T13:00:00',
                end: '2024-06-23T14:00:00',
                title: 'Client Call',
                description: 'Call with the client to review project requirements.',
                extendedProps: {
                  location: 'Skype',
                  attendees: ['Client A', 'Client B'],
                  priority: 'High',
                },
              },
              {
                start: '2024-06-24T10:00:00',
                end: '2024-06-24T11:00:00',
                title: 'Code Review',
                description: 'Review the latest code submissions.',
                extendedProps: {
                  location: 'Online',
                  attendees: ['Alice', 'Bob'],
                  priority: 'Medium',
                },
              },
              {
                start: '2024-06-25T16:00:00',
                end: '2024-06-25T17:00:00',
                title: 'Project Retrospective',
                description: 'Retrospective meeting for the completed project.',
                extendedProps: {
                  location: 'Conference Room B',
                  attendees: ['Project Team'],
                  priority: 'High',
                },
              },
        ]
    })

  }