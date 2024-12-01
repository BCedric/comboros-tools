import React from 'react'
import EditableCalendar from '../shared/editable-calendar/EditableCalendar'

const formatBand = (b) => ({
  ...b,
  title: b.name,
  extendedProps: { room: b.room },
  backgroundColor: b.room.color
})

const Prog = () => {
  return (
    <>
      <h1>Programmation</h1>
      <EditableCalendar formatEvents={formatBand} route="/band" />
    </>
  )
}

export default Prog
