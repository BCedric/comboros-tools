import {
  CustomForm,
  CustomFormField
} from '@b-cedric/react-common-bootstrap/form'
import React, { useState } from 'react'

const ArtistsMealForm = ({
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
    mealValues: [],
    ...globalFormFields
  })
  console.log(formFields)

  return (
    <>
      <p className="informations">
        Les nuitées vous seront offertes la veille et le jour de votre ou vos
        prestation·s - spectacle, concert, bal, stage - en hébergement
        semi-collectif à l'internat du lycée (5 personnes maximum par chambre)
        ou éventuellement chez l'habitant sous réserve de places. Si vous
        souhaitez prolonger la durée de votre séjour à l'internat, la nuitée
        vous sera facturée 11,50€ à régler sur place à l'Accueil Artistes.
      </p>
      <ul className="italic">
        <li>
          Vous pouvez cocher plusieurs cases, votre régime alimentaire sera
          écrit sur votre pass.
        </li>
        <li>
          Attention, il n'y aura pas de changement possible au dernier moment.
        </li>
        <li>Si vous n'avez pas de régime particulier, passez cette étape.</li>
        <li>
          Les menus seront dans la mesure de possible constitués de sorte à ce
          que les régimes spéciaux soient inclus dans le menu végétarien.
        </li>
        <li>
          Merci de bien préciser toutes vos contraintes alimentaires, pour que
          nous puissions anticiper au mieux leur prise-en-charge.
        </li>
      </ul>
      <CustomForm
        formFields={formFields}
        setFormFields={setFormFields}
        submitLabel="Suivant"
        onSubmit={onSubmit}
        onCancel={() => prevStep()}
        cancelLabel="Précédent"
      >
        <CustomFormField
          label="🍜 CHOIX DU RÉGIME ALIMENTAIRE 🥬"
          fieldName="mealValues"
          type="checkboxes"
          className="column"
          options={[
            { label: 'Végétarien', value: 'Végétarien' },
            { label: 'Sans gluten', value: 'Sans gluten' },
            { label: 'Sans lactose', value: 'Sans lactose' },
            { label: 'Sans oeufs', value: 'Sans oeufs' },
            { label: 'Sans porc', value: 'Sans porc' }
          ].map(({ label, value }) => ({ value, label }))}
          otherOption={true}
        />
      </CustomForm>
    </>
  )
}

export default ArtistsMealForm
