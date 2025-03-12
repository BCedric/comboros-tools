import { mdiClose, mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import moment from 'moment'
import React from 'react'

const CalendarEvent = ({ eventInfo, editEvent, deleteEvent }) => {
  return (
    <div
      className="calendar-event"
      title={`${moment(eventInfo.event.extendedProps.start).format(
        'HH:mm'
      )} - ${moment(eventInfo.event.extendedProps.end).format('HH:mm')} ${
        eventInfo.event.title
      }`}
    >
      <div className="event-header">
        <b>{`${moment(eventInfo.event.extendedProps.start).format(
          'HH:mm'
        )} - ${moment(eventInfo.event.extendedProps.end).format('HH:mm')}`}</b>
        <div className="icons-containers">
          <Icon
            path={mdiPencil}
            size={0.6}
            onClick={(e) => (
              e.stopPropagation(), editEvent(eventInfo.event.id)
            )}
          />
          <Icon
            path={mdiClose}
            size={0.6}
            onClick={(e) => (
              e.stopPropagation(), deleteEvent(eventInfo.event.id)
            )}
          />
        </div>
      </div>
      <div className="event-content">
        <i>{eventInfo.event.title}</i>
        {eventInfo.event.extendedProps.room != null && (
          <p>{eventInfo.event.extendedProps.room.label}</p>
        )}
      </div>
    </div>
  )
}

export default CalendarEvent
