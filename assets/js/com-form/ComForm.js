import {
  CustomForm,
  CustomFormField,
  Http
} from '@b-cedric/react-common-bootstrap'
import { useAlertsContext } from '@b-cedric/react-common-bootstrap/alert'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBandsContext } from '../shared/BandsProvider'

const ComForm = () => {
  const { accessCode } = useParams()

  useEffect(() => {
    Http.get(`/band/access-code/${accessCode}`).then((band) =>
      setFormFields((prev) => ({
        ...prev,
        band: band.id,
        photos: band.imgs,
        ...band
      }))
    )
  }, [accessCode])

  const [formFields, setFormFields] = useState({
    presentation: '',
    band: '',
    photos: null,
    members: '',
    otherElements: '',
    link: ''
  })

  const { addAlert } = useAlertsContext()

  useEffect(() => console.log(formFields), [formFields])

  const { bands } = useBandsContext()

  const handleSubmit = () => {
    const formData = new FormData()
    Array.from(formFields.photos).forEach((photo, index) =>
      formData.append(index, photo)
    )
    formData.append('body', JSON.stringify(formFields))

    Http.postFormData(`/band/${formFields.band}`, formData)
      .then(() => addAlert('Le formulaire a bien été enregistré', 'success'))
      .catch(
        () => "Une erreur est survenue lors de l'enregistrement du formulaire",
        'danger'
      )
  }

  return (
    <div>
      <h1>Formulaire des éléments de communication</h1>
      <CustomForm
        onSubmit={handleSubmit}
        formFields={formFields}
        setFormFields={setFormFields}
      >
        <CustomFormField
          label="Nom du groupe, de l'artiste ou du spectacle."
          options={bands.map((g, index) => ({
            ...g,
            label: g.name,
            value: g.id
          }))}
          fieldName="band"
          type="select"
          disabled
        />
        <CustomFormField
          label="Photo(s) (taille max: 2Mo)"
          type="file"
          fieldName="photos"
          multiple
          accept="image/*"
        />

        <CustomFormField
          label="Nom des membres du groupe et leurs rôles (instruments détaillés, lumière, sonorisation)."
          type="textarea"
          fieldName="members"
        />
        <CustomFormField
          label="Texte de présentation (5-6 lignes)"
          type="textarea"
          fieldName="presentation"
        />
        <CustomFormField
          label="Lien vers les ressources numériques : site, vidéos ou réseaux sociaux, si vous en disposez."
          fieldName="link"
        />

        <CustomFormField
          label="Tout autre élément que vous souhaiteriez ajouter. "
          fieldName="otherElements"
          type="textarea"
        />
      </CustomForm>
    </div>
  )
}

export default ComForm
