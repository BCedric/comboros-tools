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
  displayMonday = false,
  modalEventContent,
  modalEventTitle
}) => {
  const [events, setEvents] = useState([])
  const [showModalEvent, setShowModalEvent] = useState(false)
  const [currentSelectInfo, setCurrentSelectInfo] = useState(null)

  useEffect(() => {
    onEventsChange(events)
  }, [events])

  const customSetEvents = (events) => setEvents(events.map(formatEvents))

  useEffect(() => {
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
        modalEventContent={modalEventContent}
        modalEventTitle={modalEventTitle}
      />
    </div>
  )
}

export default EditableCalendar
