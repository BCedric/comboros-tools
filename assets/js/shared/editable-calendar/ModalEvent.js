import { CustomModal } from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'

const initEvent = {
  name: '',
  room: null,
}

const ModalEvent = ({
  onValidate,
  show,
  setShow,
  currentSelectInfo,
  modalEventContent = () => {},
  modalEventTitle = ''
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

  const handleValidate = () => {
    onValidate(newEvent)
    setNewEvent({ ...initEvent })
  }

  return (
    <div>
      <CustomModal
        title={modalEventTitle}
        content={modalEventContent(newEvent, setNewEvent)}
        show={show}
        setShow={setShow}
        onValidate={handleValidate}
        onCancel={() => setNewEvent({ ...initEvent })}
      />
    </div>
  )
}

export default ModalEvent
