import {
  CustomFormField,
  CustomFormFieldSelect,
  CustomModal
} from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'

const initEvent = {
  name: '',
  room: null
}

const ModalEvent = ({
  rooms,
  onValidate,
  show,
  setShow,
  currentSelectInfo
}) => {
  const [newEvent, setNewEvent] = useState({
    ...initEvent
  })

  useEffect(() => {
    setNewEvent({
      ...initEvent,
      ...currentSelectInfo
    })
  }, [currentSelectInfo])

  console.log(newEvent.room)

  const handleValidate = () => {
    onValidate(newEvent)
    setNewEvent({ ...initEvent })
  }

  return (
    <div>
      <CustomModal
        title="Ajout d'un concert/bal"
        content={
          <div>
            <CustomFormField
              label="Nom du groupe"
              value={newEvent.name}
              onChange={(value) =>
                setNewEvent({ ...newEvent, name: value, title: value })
              }
            />
            <CustomFormFieldSelect
              label="Lieu"
              value={newEvent.room == null ? null : newEvent.room.id}
              options={rooms.map((r) => ({
                label: r.label,
                value: r.id,
                ...r
              }))}
              onChange={(event) => setNewEvent({ ...newEvent, room: event })}
            />
          </div>
        }
        show={show}
        setShow={setShow}
        onValidate={handleValidate}
      />
    </div>
  )
}

export default ModalEvent
