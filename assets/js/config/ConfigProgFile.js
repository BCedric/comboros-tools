import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ConfigForm from './ConfigForm'

const ConfigProgFile = ({}) => {
  const config = useOutletContext()
  
  const [formFields, setFormFields] = useState({
    progCSV: '',
    progCSVbandName: 0,
    progCSVday: 0,
    progCSVtime: 0,
    progCSVplace: 0,
    ...config
  })

  return (
    <ConfigForm formFields={formFields} setFormFields={setFormFields}>
      <h2>Fichier programmation</h2>
      <CustomFormField
        label="URL du ficher CSV de la programmation de bals"
        fieldName="progCSV"
      />
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom du groupe"
          fieldName="progCSVbandName"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le jour du bal"
          fieldName="progCSVday"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant l'heure du bal"
          fieldName="progCSVtime"
          type="number"
        />
      </div>
      <CustomFormField
        label="Numéro de la colonne contenant le lieu du bal"
        fieldName="progCSVplace"
        type="number"
      />
    </ConfigForm>
  )
}

export default ConfigProgFile
