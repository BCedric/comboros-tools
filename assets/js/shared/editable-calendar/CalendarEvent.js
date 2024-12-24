import { mdiClose, mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

const CalendarEvent = ({ eventInfo, editEvent, deleteEvent }) => {
  return (
    <>
      <div className="event-header">
        <b>{eventInfo.timeText}</b>
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
            onClick={() => (
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
    </>
  )
}

export default CalendarEvent
