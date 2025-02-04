import { CustomFormField } from '@b-cedric/react-common-bootstrap/form'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import React, { useEffect, useState } from 'react'

const RoomFormField = ({ value, onChange }) => {
  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Http.get('/room').then((rooms) => (setRooms(rooms), setIsLoading(false)))
  }, [])

  return (
    <>
      {!isLoading ? (
        <CustomFormField
          type="select"
          label="Lieu"
          value={value}
          options={rooms.map((r) => ({
            label: r.label,
            value: r.id,
            ...r
          }))}
          onChange={onChange}
        />
      ) : (
        <div className="flex center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}

export default RoomFormField
