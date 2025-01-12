import { CustomForm, Http } from '@b-cedric/react-common-bootstrap'
import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const ConfigForm = ({ formFields, setFormFields, children }) => {
  const config = useOutletContext()
  useEffect(() => {
    // const copy = { ...formFields }
    // Object.keys(formFields).forEach((key) => {
    //   if (config[key] != null) {
    //     copy[key] = config[key]
    //   }
    // })
    // setFormFields(copy)
    setFormFields({ ...formFields, ...config })
  }, [])

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
