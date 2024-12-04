import React, { useState } from 'react'
import ConfigForm from './ConfigForm'
import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import { useOutletContext } from 'react-router-dom'

const ConfigFDR = () => {
    const config = useOutletContext()
    const [formFields, setFormFields] = useState({
      ...config
    })
  return (
    <ConfigForm formFields={formFields} setFormFields={setFormFields}>
      <h2>Feuilles de route</h2>
      <CustomFormField
        label="URL du fichier docx de la feuille de route type"
        fieldName="urlFDR"
      />
    </ConfigForm>
  )
}

export default ConfigFDR