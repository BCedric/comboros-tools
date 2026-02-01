import {
  CustomForm,
  ListFormControl
} from '@b-cedric/react-common-bootstrap/form'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import React, { useEffect, useState } from 'react'

const ConfigArtistLiaisonOfficer = () => {
  const [officers, setOfficers] = useState([])

  useEffect(() => {
    Http.get('/artist-liaison-officer').then((officers) =>
      setOfficers(officers)
    )
  }, [])

  const addOfficer = () =>
    setOfficers([
      ...officers,
      { firstname: '', lastname: '', mail: '', phone: '' }
    ])

  const submit = () =>
    Http.post('/artist-liaison-officer', { officers}).then(
      (officers) => setOfficers(officers)
    )

  return (
    <CustomForm onSubmit={submit}>
      <ListFormControl
        label="Référents accueil artiste"
        list={officers}
        titleActions={[{ label: 'Ajouter', onClick: addOfficer }]}
        fields={[
          { label: 'Prénom', propName: 'firstname' },
          { label: 'Nom', propName: 'lastname' },
          { label: 'Email', propName: 'mail' },
          { label: 'Téléphone', propName: 'phone' }
        ]}
        setList={(list) => setOfficers(list)}
      />
    </CustomForm>
  )
}

export default ConfigArtistLiaisonOfficer
