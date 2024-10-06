import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ConfigForm from './ConfigForm'

const ConfigWorkshopFile = () => {
  const config = useOutletContext()

  const [formFields, setFormFields] = useState({
    workshopCSV: '',
    workshopCSVname: 0,
    workshopCSVday: 0,
    workshopCSVperiod: 0,
    workshopCSVplace: 0,
    ...config
  })
  return (
    <ConfigForm formFields={formFields} setFormFields={setFormFields}>
      <h2>Fichier des stages</h2>
      <CustomFormField
        label="URL du ficher CSV de la programmation des stages"
        fieldName="workshopCSV"
      />
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom du stage"
          fieldName="workshopCSVname"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le jour du stage"
          fieldName="workshopCSVday"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le créneau du stage (matin / après-midi)"
          fieldName="workshopCSVperiod"
          type="number"
        />
      </div>
      <CustomFormField
        label="Numéro de la colonne contenant le lieu du stage"
        fieldName="workshopCSVplace"
        type="number"
      />
    </ConfigForm>
  )
}

export default ConfigWorkshopFile
