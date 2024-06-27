'use client';
import Card from '@mui/material/Card';
import Calendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import {  useState } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import { useResponsive } from 'src/hooks/use-responsive';
import { StyledCalendar } from './styles';
import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/app/components/settings';
import CalendarToolbar from './calendar-toolbar';
import useCalendar from './hooks/use-calendar';
import { useBoolean } from 'src/hooks/use-boolean';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import elLocale from '@fullcalendar/core/locales/el';
import { useRouter } from 'next/navigation';
 interface Event {
  start: string;
  end: string;
  title: string;
  description: string;
  extendedProps: {
    [key: string]: any;
  };
}



const fetcher  = async (startDate: string, endDate: string): Promise<Event[]> => {
  return await axios.post('/api/events', {
    startDate,
    endDate,
  }).then(res => res.data.result)

}


export default function FullCalendarView() {
  const smUp = useResponsive('up', 'sm');
  const [event, setEvent] = useState<Event>({
    start: '',
    end: '',
    title: '',
    description: '',
    extendedProps: {}
  })
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetcher('2022-01-01', '2024-12-31'),
  })
 
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

  const onEventClick = (info: any) => {
    const id = info.event?.extendedProps?.id
    let event = {
      start: info.event.start,
      end: info.event.end,
      title: info.event.title,
      description: info.event.description,
      extendedProps: info.event.extendedProps
    }
    // setEvent({
    //   start: info.event.start,
    //   end: info.event.end,
    //   title: info.event.title,
    //   description: info.event.description,
    //   extendedProps: info.event.extendedProps
    // })
    router.push(`/dashboard/event/${id}`)
    
   
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <Typography variant="h4">Ραντεβού</Typography> */}
      <Card
       sx={{
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
            editable={false}
            droppable={false}
            selectable
            locale={elLocale}
            rerenderDelay={10}
            allDayMaintainDuration
            // eventResizableFromStart
            ref={calendarRef}
            //   initialDate={date}
            //   initialView={view}
            initialView="dayGridMonth"
            dayMaxEventRows={3}
            eventDisplay="block"
            events={data}
            eventClick={onEventClick}
            headerToolbar={false}
          
            //   select={onSelectRange}
            //   eventClick={onClickEvent}
            height={smUp ? 800 : 'auto'}
            moreLinkClick={"day"}
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
