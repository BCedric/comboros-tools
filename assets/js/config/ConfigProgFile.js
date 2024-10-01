import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import React from 'react'

const ConfigProgFile = () => {
  return (
    <div>
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
    </div>
  )
}

export default ConfigProgFile