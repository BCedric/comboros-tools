import {
  CustomForm,
  CustomFormField,
  Http
} from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'
import ConfigArtisteAnswer from './ConfigArtisteAnswer'
import ConfigProgFile from './ConfigProgFile'
import ConfigWorkshopFile from './ConfigWorkshopFile'

const Config = ({ config }) => {
  const [formFields, setFormFields] = useState({
    progCSV: '',
    progCSVbandName: 0,
    progCSVday: 0,
    progCSVtime: 0,
    progCSVplace: 0,
    workshopCSV: '',
    workshopCSVname: 0,
    workshopCSVday: 0,
    workshopCSVperiod: 0,
    workshopCSVplace: 0,
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

  const submit = () => Http.put('/config', formFields)

  return (
    <CustomForm
      onSubmit={submit}
      formFields={formFields}
      setFormFields={setFormFields}
    >
      <ConfigProgFile />
      <ConfigWorkshopFile />
      <ConfigArtisteAnswer
        formFieldPrefix="cession"
        title="Fichier de réponses avec contrat de cession"
      />
      <ConfigArtisteAnswer
        formFieldPrefix="guso"
        title="Fichier de réponses GUSO"
      />
      <h2>Feuille de route</h2>
      <CustomFormField
        label="URL de la feuille de route type"
        fieldName="urlFDR"
      />
    </CustomForm>
  )
}

export default Config
