import {
  CustomForm,
  CustomFormField,
  Http
} from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import comborosImg from '../../img/comboros9.png'
import Wysiwyg from './Wysiwyg'

const ComForm = () => {
  const { accessCode } = useParams()
  const [bandName, setBandName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Http.get(`/band/access-code/${accessCode}`)
      .then(
        (band) => (
          setFormFields((prev) => ({
            ...prev,
            band: band.id,
            photos: band.imgs,
            ...band
          })),
          setBandName(band.name)
        )
      )
      .finally(() => setIsLoading(false))
  }, [accessCode])

  const [formFields, setFormFields] = useState({
    presentation: '',
    band: '',
    photos: null,
    members: '',
    otherElements: '',
    link: ''
  })

const isPresentationValid = useMemo(
  () => formFields.presentation.replace(/\n/g, '') != '',
  [formFields.presentation]
)

  const isFormValid = useMemo(() => {
    const { presentation, members } = formFields
    return isPresentationValid && members != ''
  }, [formFields])

  console.log(formFields);

  const navigate = useNavigate()

  const handleSubmit = () => {
    const formData = new FormData()
    Array.from(formFields.photos).forEach((photo, index) =>
      formData.append(index, photo)
    )
    formData.append('body', JSON.stringify(formFields))

    return Http.postFormData(`/band/${formFields.band}`, formData)
      .then(() => navigate('/com-form/validation'))
      .catch(
        () => "Une erreur est survenue lors de l'enregistrement du formulaire",
        'danger'
      )
  }

  return (
    <>
      <div className="flex center">
        <img className="form-header-img" src={comborosImg} />
      </div>
      <h1>Formulaire des éléments de communication</h1>
      {!isLoading &&
        (bandName != '' ? (
          <div>
            <CustomForm
              onSubmit={handleSubmit}
              formFields={formFields}
              setFormFields={setFormFields}
              isFormValid={isFormValid}
            >
              <CustomFormField
                label="Nom du groupe, de l'artiste ou du spectacle."
                value={bandName}
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
                isValid={formFields.members != ''}
              />
              <Wysiwyg
                label="Texte de présentation (5-6 lignes)"
                value={formFields.presentation}
                onChange={(value) =>
                  setFormFields((prev) => ({ ...prev, presentation: value }))
                }
                isValid={isPresentationValid}
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
        ) : (
          <div>
            <p className="informations">
              Le lien que vous utilisez est erroné, veuillez en faire part à
              votre contact.
            </p>
          </div>
        ))}
    </>
  )
}

export default ComForm
