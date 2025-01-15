import React from 'react'
import EditableCalendar from '../shared/editable-calendar/EditableCalendar'

const formatWorkshop = (w) => ({
  ...w,
  title: w.name,
  extendedProps: { room: w.room },
  backgroundColor: w.room == null ? 'black' : w.room.color
})

const Workshop = () => {
  return (
    <div>
      <h1>Ateliers</h1>
      <EditableCalendar
        className="calendar-workshop"
        formatEvents={formatWorkshop}
        route="/workshop"
      />
    </div>
  )
}

export default Workshop
