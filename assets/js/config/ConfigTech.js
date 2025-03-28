import {
  CustomForm,
  Http,
  ListFormControl
} from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'

const ConfigTech = () => {
  const [tech, setTech] = useState([])
  const addTech = () =>
    setTech([...tech, { room: '', name: '', mail: '', tel: '' }])

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    Http.get('/tech').then((tech) => setTech(tech.map(t => ({...t, room: t.room.id}))))
    Http.get('/room').then((rooms) =>
      setRooms(rooms.map((r) => ({ label: r.label, value: r.id })))
    )
  }, [])

  const submit = () => Http.post('/tech', { tech })

  return (
    <CustomForm onSubmit={submit}>
      <ListFormControl
        label="Techniciens"
        list={tech}
        titleActions={[{ label: 'Ajouter', onClick: addTech }]}
        fields={[
          { label: 'Salle', propName: 'room', type: 'select', options: rooms },
          { label: 'Nom', propName: 'name' },
          { label: 'Email', propName: 'mail' },
          { label: 'Téléphone', propName: 'tel' }
        ]}
        setList={(list) =>
          setTech(
            list.map((item) => ({
              ...item,
              room: item.room.value != null ? item.room.value : item.room
            }))
          )
        }
      />
    </CustomForm>
  )
}

export default ConfigTech
