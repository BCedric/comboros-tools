import {
  CustomFormField,
  CustomFormFieldInputList
} from '@b-cedric/react-common-bootstrap/form'
import React from 'react'
import RoomFormField from '../shared/RoomFormField'
import EditableCalendar from '../shared/editable-calendar/EditableCalendar'

const formatWorkshop = (w) => ({
  ...w,
  title: w.name,
  extendedProps: { ...w },
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
        slotMinTime="10:00:00"
        slotMaxTime="17:30:00"
        modalEventContent={(newEvent, setNewEvent) => (
          <div>
            <CustomFormField
              label="Intitulé du stage"
              value={newEvent.name}
              onChange={(value) =>
                setNewEvent({ ...newEvent, name: value, title: value })
              }
            />
            <RoomFormField
              value={newEvent.room == null ? null : newEvent.room.id}
              onChange={(event) => setNewEvent({ ...newEvent, room: event })}
            />
            <CustomFormField
              label="Descriptif"
              value={newEvent.description}
              onChange={(value) =>
                setNewEvent({ ...newEvent, description: value })
              }
              type="textarea"
            />
            <CustomFormFieldInputList
              label="Intervenants"
              value={newEvent.speakers == null ? [] : newEvent.speakers}
              onChange={(value) =>
                setNewEvent({ ...newEvent, speakers: value })
              }
            />
            <CustomFormField
              label="Niveau attendu"
              value={newEvent.level}
              onChange={(value) => setNewEvent({ ...newEvent, level: value })}
            />
            <CustomFormField
              label="Jauge"
              value={newEvent.gauge == null ? 0 : newEvent.gauge}
              onChange={(value) => setNewEvent({ ...newEvent, gauge: value })}
              type="number"
            />
          </div>
        )}
        modalEventTitle="Ajout d'un stage"
      />
    </div>
  )
}

export default Workshop
