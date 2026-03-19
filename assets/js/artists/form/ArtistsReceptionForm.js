import {
  CustomForm,
  CustomFormField
} from '@b-cedric/react-common-bootstrap/form'
import moment from 'moment'
import React, { useMemo, useState } from 'react'

const ArtistsReceptionForm = ({
  prevStep,
  nextStep,
  globalFormFields,
  setGlobalFormFields
}) => {
  const onSubmit = () => {
    nextStep()
    setGlobalFormFields(formFields)
  }

  const [formFields, setFormFields] = useState({
    hostingType: 'Camping du festival',
    schoolNights: [],
    ...globalFormFields
  })

  const nightsDateOptions = useMemo(() => {
    const monthNumber = 7
    const daysNumber = [3, 4, 5, 6, 7]
    const date = moment().set('month', monthNumber).date(1).set('day', 3)
    if (date.month() < monthNumber) {
      date.add(1, 'week')
    }

    return daysNumber.map((num, key) => {
      const option = date.clone()
      option.add(key, 'day')
      return option
    })
  }, [])

  return (
    <>
      <p className="informations">
        Les nuitées vous seront offertes la veille et le jour de votre ou vos
        prestation·s - spectacle, concert, bal, stage - en hébergement
        semi-collectif à l'internat du lycée (5 personnes maximum par chambre)
        ou éventuellement chez l'habitant sous réserve de places.
      </p>
      <p className="informations">
        Si vous souhaitez prolonger la durée de votre séjour à l'internat, la
        nuitée vous sera facturée 11,50€ à régler sur place à l'Accueil
        Artistes.
      </p>
      <CustomForm
        formFields={formFields}
        setFormFields={setFormFields}
        submitLabel="Suivant"
        onSubmit={onSubmit}
        onCancel={() => prevStep()}
        cancelLabel="Précédent"
      >
        <CustomFormField
          label="Choix de l'hébergement"
          type="radio"
          fieldName="hostingType"
          className="column"
          options={[
            {
              label: 'Camping du festival - gratuit',
              value: 'Camping du festival'
            },
            {
              label:
                'Hébergement semi-collectif au lycée - pris en charge par le festival la veille et le jour de votre prestation',
              value: 'Hébergement semi-collectif au lycée'
            },
            {
              label:
                'Hébergement personnel - non pris en charge par le festival',
              value: 'Hébergement personnel'
            }
          ]}
          otherValue={true}
        />
        <CustomFormField
          label="Nuitées en hébergement semi-collectif"
          type="checkboxes"
          fieldName="schoolNights"
          options={nightsDateOptions.map((option) => ({
            value: option.format('D-M-Y'),
            label: option.format('dddd D MMMM')
          }))}
          disabled={
            formFields.hostingType !== 'Hébergement semi-collectif au lycée'
          }
        />
      </CustomForm>
    </>
  )
}

export default ArtistsReceptionForm
