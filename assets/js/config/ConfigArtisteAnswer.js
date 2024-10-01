import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import React, { useCallback } from 'react'

const ConfigArtisteAnswer = ({ formFieldPrefix, title }) => {
  const getFieldName = useCallback(
    (fieldName) => `${formFieldPrefix}${fieldName}`,
    [formFieldPrefix]
  )
  return (
    <div>
      <h2>{title}</h2>
      <CustomFormField
        label="URL du ficher CSV des réponses au formulaire par contrat de cession"
        fieldName={getFieldName('CSV')}
      />
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom du groupe"
          fieldName={getFieldName('CSVbandName')}
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le nom"
          fieldName={getFieldName('CSVLastname')}
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le prénom"
          fieldName={getFieldName('CSVFirstname')}
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant la date d'arrivée"
          fieldName={getFieldName('CSVDateArrival')}
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant l'heure d'arrivée"
          fieldName={getFieldName('CSVTimeArrival')}
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant la date de départ"
          fieldName={getFieldName('CSVDateDeparture')}
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant l'heure de départ"
          fieldName={getFieldName('CSVTimeDeparture')}
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom de l'accompagnateur.rice"
          fieldName={getFieldName('CSVCompanion')}
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le nom des enfants"
          fieldName={getFieldName('CSVChildren')}
          type="number"
        />
      </div>
    </div>
  )
}

export default ConfigArtisteAnswer
