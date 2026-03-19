import {
  CustomForm,
  CustomFormField
} from '@b-cedric/react-common-bootstrap/form'
import React, { useState } from 'react'

const ArtistsCompanionsForm = ({
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
    companionName: '',
    childrenName: '',
    ...globalFormFields
  })

  return (
    <>
      <p className="informations">
        Les accompagnateur·rice·s - 1 par artiste - bénéficient d'un accès à
        toute la programmation à St-Gervais - hors stages. Les nuitées en
        internat leur seront facturées 11,50€/nuit, et leurs repas ne sont pas
        pris en charge par l'organisation. Des stands de restauration rapide
        sont à leur disposition.
      </p>
      <p className="informations">
        En revanche, afin de ne pas défavoriser les artistes venant seul.e.s
        avec leurs enfants, les repas et l'hébergement de ceux-ci seront pris en
        charge. N'hésitez pas à nous contacter pour plus de renseignements.
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
          label="Nom et prénom de votre accompagnateur·rice"
          fieldName="companionName"
        />
        <CustomFormField
          label="Noms, prénoms et âge de votre accompagnateur·rice enfant"
          fieldName="childrenCompanions"
        />
      </CustomForm>
    </>
  )
}

export default ArtistsCompanionsForm
