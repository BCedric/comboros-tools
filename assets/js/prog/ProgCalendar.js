import React, { useMemo, useState } from 'react'
import EditableCalendar from '../shared/editable-calendar/EditableCalendar'
import { useConfirm } from '@b-cedric/react-common-bootstrap/modal'
import { CustomFormField } from '@b-cedric/react-common-bootstrap/form'
import RoomFormField from '../shared/RoomFormField'
import BandDetails from './BandDetails'

const formatBand = (b) => ({
  ...b,
  title: b.name,
  extendedProps: { ...b },
  backgroundColor: b.room == null ? 'black' : b.room.color
})

const ProgCalendar = ({ bands, setBands }) => {
  const confirm = useConfirm()
  
  const [selectedBandId, setSelectedBandId] = useState(null)
   const selectedBand = useMemo(
     () => bands.find((b) => b.id === parseInt(selectedBandId)),
     [selectedBandId]
   )
    
  return (
    <>
      <EditableCalendar
        className={'prog-calendar'}
        formatEvents={formatBand}
        route="/band"
        onClickEvent={({ event }) => setSelectedBandId(event.id)}
        beforeDelete={() => {
          return new Promise((resolve) => {
            confirm(
              'Attention, la suppression pourrait casser le lien vers le formulaire pour renseigner les éléments de communication et effacer ceux-ci.',
              () => resolve()
            )
          })
        }}
        onEventsChange={(bands) => setBands(bands)}
        displayMonday={true}
        modalEventContent={(newEvent, setNewEvent) => (
          <div>
            <CustomFormField
              label="Nom du groupe"
              value={newEvent.name}
              onChange={(value) =>
                setNewEvent({ ...newEvent, name: value, title: value })
              }
            />
            <RoomFormField
              value={newEvent.room == null ? null : newEvent.room.id}
              onChange={(event) => setNewEvent({ ...newEvent, room: event })}
            />
          </div>
        )}
        modalEventTitle="Ajout d'un concert/bal"
      />
      {selectedBand != null && (
        <BandDetails
          close={() => setSelectedBandId(null)}
          band={selectedBand}
        />
      )}
    </>
  )
}

export default ProgCalendar
