import { Http } from '@b-cedric/react-common-bootstrap'
import frLocale from '@fullcalendar/core/locales/fr'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment'
import React from 'react'
import CalendarEvent from './CalendarEvent'

const Calendar = ({
  setShowModalEvent,
  events,
  setEvents,
  setCurrentSelectInfo,
  route,
  onClickEvent = () => {},
  beforeDelete = () => new Promise((resolve) => resolve()),
  displayMonday = false,
  slotMinTime,
  slotMaxTime
}) => {
  const handleSelect = (selectInfo) => {
    setShowModalEvent(true)
    setCurrentSelectInfo(selectInfo)
  }

  const handleEventChange = (param) => {
    const event = param.event
    Http.post(route, {
      id: event.id,
      name: event.title,
      room:
        event.extendedProps.room != null ? event.extendedProps.room.id : null,
      start: moment(event.start).format(),
      end: moment(event.end).format()
    }).then((events) => setEvents(events))
  }

  const editEvent = (eventId) => {
    const event = events.find((e) => e.id === parseInt(eventId))
    setCurrentSelectInfo(event)
    setShowModalEvent(true)
  }

  const deleteEvent = (id) => {
    beforeDelete(id).then(() =>
      Http.delete(`${route}/${id}`).then((events) => setEvents(events))
    )
  }

  return (
    <FullCalendar
      height={'85vh'}
      events={events}
      locale={frLocale}
      headerToolbar={false}
      allDaySlot={false}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      editable={true}
      selectable={true}
      weekends={true}
      initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
      hiddenDays={displayMonday ? [2, 3, 4] : [1, 2, 3, 4]}
      firstDay={5}
      initialDate="2025-08-08"
      eventChange={handleEventChange}
      eventClick={onClickEvent}
      select={(param) => handleSelect(param)}
      eventContent={(eventInfo) => (
        <CalendarEvent
          editEvent={editEvent}
          deleteEvent={deleteEvent}
          eventInfo={eventInfo}
        />
      )}
      slotDuration="00:15:00"
      scrollTime={false}
      slotMinTime={slotMinTime}
      slotMaxTime={slotMaxTime}
      timezone="Europe/Paris"
    />
  )
}

export default Calendar
