import {
  CustomForm,
  CustomFormField,
  Http
} from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'

const Config = ({ config }) => {
  const [formFields, setFormFields] = useState({
    progCSV: '',
    progCSVbandName: 0,
    progCSVday: 0,
    progCSVtime: 0,
    progCSVplace: 0,
    cessionCSV: '',
    cessionCSVbandName: 0,
    cessionCSVLastname: 0,
    cessionCSVFirstname: 0,
    cessionCSVDateArrival: 0,
    cessionCSVTimeArrival: 0,
    cessionCSVDateDeparture: 0,
    cessionCSVTimeDeparture: 0,
    gusoCSV: '',
    gusoCSVbandName: 0,
    gusoCSVLastname: 0,
    gusoCSVFirstname: 0,
    gusoCSVDateArrival: 0,
    gusoCSVTimeArrival: 0,
    gusoCSVDateDeparture: 0,
    gusoCSVTimeDeparture: 0
  })

  useEffect(() => {
    setFormFields((prev) => ({ ...prev, ...config }))
  }, [])

  useEffect(() => {
    console.log(formFields)
  }, [formFields])

  const submit = () => Http.put('/config', formFields)

  return (
    <CustomForm
      onSubmit={submit}
      formFields={formFields}
      setFormFields={setFormFields}
    >
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
      <h2>Fichier de réponses avec contrat de cession</h2>
      <CustomFormField
        label="URL du ficher CSV des réponses au formulaire par contrat de cession"
        fieldName="cessionCSV"
      />
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom du groupe"
          fieldName="cessionCSVbandName"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le nom"
          fieldName="cessionCSVLastname"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le prénom"
          fieldName="cessionCSVFirstname"
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant la date d'arrivée"
          fieldName="cessionCSVDateArrival"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant l'heure d'arrivée"
          fieldName="cessionCSVTimeArrival"
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant la date de départ"
          fieldName="cessionCSVDateDeparture"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant l'heure de départ"
          fieldName="cessionCSVTimeDeparture"
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom de l'accompagnateur.rice"
          fieldName="cessionCSVCompanion"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le nom des enfants"
          fieldName="cessionCSVChildren"
          type="number"
        />
      </div>
      <h2>Fichier de réponses GUSO</h2>
      <CustomFormField
        label="URL du ficher CSV des réponses au formulaire GUSO"
        fieldName="gusoCSV"
      />
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom du groupe"
          fieldName="gusoCSVbandName"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le nom"
          fieldName="gusoCSVLastname"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le prénom"
          fieldName="gusoCSVFirstname"
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant la date d'arrivée"
          fieldName="gusoCSVDateArrival"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant l'heure d'arrivée"
          fieldName="gusoCSVTimeArrival"
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant la date de départ"
          fieldName="gusoCSVDateDeparture"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant l'heure de départ"
          fieldName="gusoCSVTimeDeparture"
          type="number"
        />
      </div>
      <div className="form-line">
        <CustomFormField
          label="Numéro de la colonne contenant le nom de l'accompagnateur.rice"
          fieldName="gusoCSVCompanion"
          type="number"
        />
        <CustomFormField
          label="Numéro de la colonne contenant le nom des enfants"
          fieldName="gusoCSVChildren"
          type="number"
        />
      </div>
      <h2>Feuille de route</h2>
      <CustomFormField
        label="URL de la feuille de route type"
        fieldName="urlFDR"
      />
    </CustomForm>
  )
}

export default Config
