import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import React from 'react'

const ConfigWorkshopFile = () => {
  return (
    <div>
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
    </div>
  )
}

export default ConfigWorkshopFile
