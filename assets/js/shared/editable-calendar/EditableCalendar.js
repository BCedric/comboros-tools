import { Http } from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar'
import ModalEvent from './ModalEvent'

const EditableCalendar = ({
  formatEvents = (event) => event,
  route,
  onClickEvent = () => {},
  className,
  beforeDelete,
  onEventsChange = () => {},
  displayMonday = false
}) => {
  const [rooms, setRooms] = useState([])
  const [events, setEvents] = useState([])
  const [showModalEvent, setShowModalEvent] = useState(false)
  const [currentSelectInfo, setCurrentSelectInfo] = useState(null)

  useEffect(() => {
    onEventsChange(events)
  }, [events])

  const customSetEvents = (events) => setEvents(events.map(formatEvents))
  useEffect(() => {
    Http.get('/room').then((rooms) => setRooms(rooms))
    Http.get(route).then(customSetEvents)
  }, [])

  return (
    <div className={`calendar-container ${className}`}>
      <Calendar
        setShowModalEvent={setShowModalEvent}
        events={events}
        setEvents={customSetEvents}
        setCurrentSelectInfo={setCurrentSelectInfo}
        route={route}
        onClickEvent={onClickEvent}
        beforeDelete={beforeDelete}
        displayMonday={displayMonday}
      />
      <ModalEvent
        rooms={rooms}
        show={showModalEvent}
        setShow={setShowModalEvent}
        currentSelectInfo={currentSelectInfo}
        onValidate={(newEvent) => {
          Http.post(route, {
            ...currentSelectInfo,
            ...newEvent,
            room: newEvent.room == null ? null : newEvent.room.id
          }).then(customSetEvents)
          setCurrentSelectInfo(null)
        }}
      />
    </div>
  )
}

export default EditableCalendar
