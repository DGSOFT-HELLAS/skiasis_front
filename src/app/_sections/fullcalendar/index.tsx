'use client';
import Card from '@mui/material/Card';
import Calendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useEffect, useState } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import { useResponsive } from 'src/hooks/use-responsive';
import { StyledCalendar } from './styles';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useSettingsContext } from 'src/app/components/settings';
import CalendarToolbar from './calendar-toolbar';
import useCalendar from './hooks/use-calendar';
import { useBoolean } from 'src/hooks/use-boolean';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Event {
  start: string;
  end: string;
  title: string;
  description: string;
  extendedProps: {
    [key: string]: any;
  };
}

interface FetchEventsResponse {
  data: Event[];
}

const fetcher  = () => {
   return axios.post<FetchEventsResponse>('/api/events')
}

export default function FullCalendarView() {
  const smUp = useResponsive('up', 'sm');
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: fetcher
     
  // })

  useEffect(() => {
    const handleFetch = async() => {
      const {data} = await axios.post('/api/events', {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      })
      console.log(data)
    }
    handleFetch()
  }, [])
  const [events, setEvents] = useState([]);
  const openFilters = useBoolean();
  const settings = useSettingsContext();
  const {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    //
    openForm,
    onOpenForm,
    onCloseForm,
    //
    selectEventId,
    selectedRange,
    //
    onClickEventInFilters,
  } = useCalendar();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Ραντεβού </Typography>
      <Card
       sx={{
        mt: 5,
      }}>
        <StyledCalendar>
        <CalendarToolbar
              date={date}
              view={view}
              loading={false}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onChangeView={onChangeView}
              onOpenFilters={openFilters.onTrue}
            />
          <Calendar
            weekends
            editable
            droppable
            selectable
            rerenderDelay={10}
            allDayMaintainDuration
            eventResizableFromStart
            ref={calendarRef}
            //   initialDate={date}
            //   initialView={view}
            initialView="dayGridMonth"
            dayMaxEventRows={3}
            eventDisplay="block"
            events={events}
            headerToolbar={false}
            //   select={onSelectRange}
            //   eventClick={onClickEvent}
            height={smUp ? 720 : 'auto'}
            // eventDrop={(arg) => {
            //   onDropEvent(arg, updateEvent);
            // }}
            // eventResize={(arg) => {
            //   onResizeEvent(arg, updateEvent);
            // }}
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          />
        </StyledCalendar>
      </Card>
    </Container>
  );
}
