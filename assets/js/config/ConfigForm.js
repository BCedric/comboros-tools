import { CustomForm, Http } from '@b-cedric/react-common-bootstrap'
import React from 'react'

const ConfigForm = ({ formFields, setFormFields, children }) => {
  const submit = () => Http.put('/config', formFields)
  return (
    <CustomForm
      onSubmit={submit}
      formFields={formFields}
      setFormFields={setFormFields}
    >
      {children}
    </CustomForm>
  )
}

export default ConfigForm
