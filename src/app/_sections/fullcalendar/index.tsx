'use client';
import Card from '@mui/material/Card';
import Calendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useState, useEffect, useCallback, useRef } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import { useResponsive } from 'src/hooks/use-responsive';
import { StyledCalendar } from './styles';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useSettingsContext } from 'src/app/components/settings';
import CalendarToolbar from './calendar-toolbar';
import useCalendar from './hooks/use-calendar';
import { useBoolean } from 'src/hooks/use-boolean';
export default function FullCalendarView() {
  const smUp = useResponsive('up', 'sm');
  const [events, setEvents] = useState([]);
  const theme = useTheme();
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
      <Typography variant="h4"> Page Five </Typography>
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
