import { Http } from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'
import ModalEvent from './ModalEvent'
import ProgCalendar from './ProgCalendar'

const formatBand = (b) => ({
  ...b,
  title: b.name,
  extendedProps: { room: b.room },
  backgroundColor: b.room.color
})

const Prog = () => {
  const [rooms, setRooms] = useState([])
  const [events, setEvents] = useState([])
  const [showModalEvent, setShowModalEvent] = useState(false)
  const [currentSelectInfo, setCurrentSelectInfo] = useState(null)
  // useEffect(() => console.log(currentSelectInfo), [currentSelectInfo])
  useEffect(() => {
    Http.get('/room').then((rooms) => setRooms(rooms))
    Http.get('/band').then((bands) => setEvents(bands.map(formatBand)))
  }, [])

  return (
    <>
      <h1>Programmation</h1>
      <div className="calendar-container">
        <ProgCalendar
          setShowModalEvent={setShowModalEvent}
          events={events}
          setEvents={setEvents}
          setCurrentSelectInfo={setCurrentSelectInfo}
        />
        <ModalEvent
          rooms={rooms}
          show={showModalEvent}
          setShow={setShowModalEvent}
          currentSelectInfo={currentSelectInfo}
          onValidate={(newEvent) => {
            Http.post('/band', {
              ...currentSelectInfo,
              ...newEvent,
              room: newEvent.room.id
            }).then((bands) => setEvents(bands.map(formatBand)))
            setCurrentSelectInfo(null)
          }}
        />
      </div>
    </>
  )
}

export default Prog
