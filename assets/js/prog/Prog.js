import { useConfirm } from '@b-cedric/react-common-bootstrap'
import React, { useMemo, useState } from 'react'
import { useBandsContext } from '../shared/BandsProvider'
import EditableCalendar from '../shared/editable-calendar/EditableCalendar'
import BandDetails from './BandDetails'

const formatBand = (b) => ({
  ...b,
  title: b.name,
  extendedProps: { room: b.room },
  backgroundColor: b.room == null ? 'black' : b.room.color
})

const Prog = () => {
  const [selectedBandId, setSelectedBandId] = useState(null)
  const { bands, setBands } = useBandsContext()
  const confirm = useConfirm()
  const selectedBand = useMemo(
    () => bands.find((b) => b.id === parseInt(selectedBandId)),
    [selectedBandId]
  )

  return (
    <>
      <h1>Programmation</h1>
      <EditableCalendar
        formatEvents={formatBand}
        route="/band"
        onClickEvent={({ event }) => setSelectedBandId(event.id)}
        beforeDelete={() => {
          return new Promise((resolve) => {
            confirm('Veuillez confirmer la suppression', () => resolve())
          })
        }}
        onEventsChange={(bands) => setBands(bands)}
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

export default Prog
