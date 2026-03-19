import {
  CustomForm,
  CustomFormField
} from '@b-cedric/react-common-bootstrap/form'
import React, { useState } from 'react'

const ArtistsCommentForm = ({
  prevStep,
  submit,
  globalFormFields,
}) => {
  const onSubmit = () => {
    submit(formFields)
  }

  const [formFields, setFormFields] = useState({
    comment: '',
    ...globalFormFields
  })

  return (
    <CustomForm
      formFields={formFields}
      setFormFields={setFormFields}
      submitLabel="Envoyer votre réponse"
      onSubmit={onSubmit}
      onCancel={() => prevStep()}
      cancelLabel="Précédent"
    >
      <CustomFormField
        label="Commentaires et questions"
        fieldName="comment"
        type="textarea"
      />
    </CustomForm>
  )
}

export default ArtistsCommentForm
