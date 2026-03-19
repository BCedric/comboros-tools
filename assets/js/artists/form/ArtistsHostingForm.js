import {
  CustomForm,
  CustomFormField
} from '@b-cedric/react-common-bootstrap/form'
import React, { useMemo, useState } from 'react'

const ArtistsHostingForm = ({
  prevStep,
  nextStep,
  globalFormFields,
  setGlobalFormFields
}) => {
  const [formFields, setFormFields] = useState({
    dateArrival: '',
    dateDeparture: '',
    cityComing: '',
    cityReturn: '',
    transport: [],
    ...globalFormFields
  })

  const isFormValid = useMemo(() => {
    const { dateArrival, dateDeparture, cityComing, cityReturn, transport } =
      formFields
    return (
      dateArrival != '' &&
      dateDeparture != '' &&
      cityComing != '' &&
      cityReturn != '' &&
      transport.length > 0
    )
  })

  const onSubmit = () => {
    nextStep()
    setGlobalFormFields(formFields)
  }

  return (
    <>
      <p className="informations">
        Vous bénéficierez d'un pass vous donnant accès à toute la programmation
        à St Gervais - hors stages.
      </p>
      <p className="informations">
        Afin de nous aider à assurer une bonne gestion de votre accueil merci de
        tenir informé votre contact au sein de l'organisation du festival (ou de
        joindre le bureau au 04.73.63.36.75 en amont) si votre planning de
        tournée change entre la saisie de votre réponses au questionnaire et le
        début du festival COMBOROS.
      </p>

      <CustomForm
        formFields={formFields}
        setFormFields={setFormFields}
        submitLabel="Suivant"
        onSubmit={onSubmit}
        onCancel={() => prevStep()}
        cancelLabel="Précédent"
        isFormValid={isFormValid}
      >
        <CustomFormField
          label="Date et heure d'arrivée au festival"
          type="datetime-local"
          fieldName="dateArrival"
          isValid={formFields.dateArrival != ''}
        />
        <CustomFormField
          label="Date et heure de départ du festival"
          type="datetime-local"
          fieldName="dateDeparture"
          isValid={formFields.dateDeparture != ''}
        />
        <CustomFormField
          label="Vous venez à COMBOROS depuis ... (Ville et Département)"
          fieldName="cityComing"
          isValid={formFields.cityComing != ''}
        />
        <CustomFormField
          label="Vous repartez de COMBOROS vers ... (Ville et Département)"
          fieldName="cityReturn"
          isValid={formFields.cityReturn != ''}
        />
        <CustomFormField
          label="Moyen de transport"
          fieldName="transport"
          isValid={formFields.transport.length > 0}
          type="checkboxes"
          options={['Voiture', 'Train', 'Covoiturage'].map((i) => ({
            value: i,
            label: i
          }))}
          otherOption
        />
      </CustomForm>
    </>
  )
}

export default ArtistsHostingForm
