import {
  CustomForm,
  CustomFormField
} from '@b-cedric/react-common-bootstrap/form'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import _ from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const ArtistsAdminForm = ({
  nextStep,
  globalFormFields,
  setGlobalFormFields
}) => {
  const [bands, setBands] = useState([])
  const [formFields, setFormFields] = useState({
    band: '',
    firstname: '',
    lastname: '',
    address: '',
    phoneNumber: '',
    band: '',
    job: 'Musicien·ne',
    isGUSO: true,
    birthDate: '',
    birthCity: '',
    birthCountry: 'France',
    IBAN: 'FR',
    GUSONumber: '',
    performanceBreaksNumber: '',
    ...globalFormFields
  })

  useEffect(() => {
    Http.get('/band').then((bands) => setBands(bands))
  }, [])

  const isFormValid = useMemo(() => {
    const {
      band,
      firstname,
      lastname,
      address,
      phoneNumber,
      isGUSO,
      birthCity,
      birthCountry,
      GUSONumber,
      IBAN,
      performanceBreaksNumber
    } = formFields
    return (
      band != '' &&
      firstname != '' &&
      lastname != '' &&
      address != '' &&
      phoneNumber != '' &&
      (!isGUSO ||
        (birthCity != '' &&
          birthCountry != '' &&
          IBAN != '' &&
          GUSONumber != '' &&
          performanceBreaksNumber != ''))
    )
  }, [formFields])

  const onSubmit = () => {
    nextStep()
    setGlobalFormFields(formFields)
  }

  useEffect(() => {
    formFields.birthCity != '' && searchPostCode(formFields.birthCity)
  }, [formFields.birthCity])

  const searchPostCode = useCallback(
    _.debounce(
      (city) =>
        Http.get(`https://geo.api.gouv.fr/communes?nom=${city}`).then(
          (cities) =>
            cities.length > 0 &&
            setFormFields((prev) => ({
              ...prev,
              birthCityPostCode: cities[0].codesPostaux[0]
            }))
        ),
      800
    ),
    []
  )

  return (
    <CustomForm
      formFields={formFields}
      setFormFields={setFormFields}
      submitLabel="Suivant"
      onSubmit={onSubmit}
      isFormValid={isFormValid}
    >
      <CustomFormField
        label="Nom du groupe ou du spectacle"
        type="select"
        options={bands.map((b) => ({ label: b.name, value: b.id }))}
        onChange={({ value }) =>
          setFormFields((prev) => ({ ...prev, band: value }))
        }
        value={formFields.band}
        isValid={formFields.band != ''}
      />
      <CustomFormField
        label="Type de contrat"
        type="select"
        value={formFields.isGUSO}
        options={[
          { label: 'Guso', value: true },
          { label: 'Cession', value: false }
        ]}
        onChange={({ value }) =>
          setFormFields((prev) => ({ ...prev, isGUSO: value }))
        }
      />
      <CustomFormField
        label="Nom"
        fieldName="lastname"
        isValid={formFields.lastname != ''}
      />
      <CustomFormField
        label="Prénom"
        fieldName="firstname"
        isValid={formFields.firstname != ''}
      />
      <CustomFormField
        label="Adresse postale"
        fieldName="address"
        isValid={formFields.address != ''}
      />
      <CustomFormField
        label="Numéro de téléphone"
        type="tel"
        fieldName="phoneNumber"
        isValid={formFields.phoneNumber != ''}
      />
      {formFields.isGUSO && (
        <>
          <CustomFormField
            label="Date de naissance"
            fieldName="birthDate"
            type="date"
            isValid={formFields.birthDate != ''}
          />
          <CustomFormField
            label="Ville de naissance"
            fieldName="birthCity"
            isValid={formFields.birthCity != ''}
          />
          <CustomFormField
            label="Code postal de la ville de naissance"
            fieldName="birthCityPostCode"
            isValid={formFields.birthCityPostCode != ''}
            type="number"
          />
          <CustomFormField
            label="Pays de naissance"
            fieldName="birthCountry"
            isValid={formFields.birthCountry != ''}
          />
          <CustomFormField
            label="IBAN (sans espace)"
            fieldName="IBAN"
            onChange={(val) =>
              val.length <= 34 &&
              setFormFields((prev) => ({ ...prev, IBAN: val }))
            }
            isValid={formFields.IBAN != ''}
          />
          <CustomFormField
            label="Numéro de GUSO"
            fieldName="GUSONumber"
            isValid={formFields.GUSONumber != ''}
          />
          <CustomFormField
            label="Numéro de congés spectacles"
            fieldName="performanceBreaksNumber"
            isValid={formFields.performanceBreaksNumber != ''}
          />
        </>
      )}
      <CustomFormField
        label="Profession"
        fieldName="job"
        type="radio"
        className="column"
        options={[
          { value: 'Musicien·ne', label: 'Musicien·ne' },
          {
            value: 'Animateur·rice de stage de danse',
            label: 'Animateur·rice de stage de danse'
          },
          { value: 'Conférencier·ère', label: 'Conférencier·ère' },
          {
            value: 'Artiste dramatique (théâtre, cirque)',
            label: 'Artiste dramatique (théâtre, cirque)'
          },
          {
            value: 'Artiste chorégraphique (spectacle de danse)',
            label: 'Artiste chorégraphique (spectacle de danse)'
          },
          { value: 'Technicien·ne lumière', label: 'Technicien·ne lumière' },
          { value: 'Technicien·ne son', label: 'Technicien·ne son' }
        ]}
        otherOption
      />
    </CustomForm>
  )
}

export default ArtistsAdminForm
