import {
  CustomForm,
  CustomFormField,
  Http
} from '@b-cedric/react-common-bootstrap'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import FDRArtistsTable from './FDRArtistsTable'

const FDRForm = () => {
  const [groups, setGroups] = useState([])
  const [workshops, setworkshops] = useState([])
  const [balanceTime, setBalanceTime] = useState('')

  const [groupSelectedIndex, setGroupSelectedIndex] = useState(null)
  const [workshopSelectedIndex, setWorkshopSelectedIndex] = useState(null)
  const groupSelected = useMemo(
    () => groups[groupSelectedIndex],
    [groupSelectedIndex, groups]
  )

  const [hosting, setHosting] = useState([])
  const workshopSelected = useMemo(
    () => workshops[workshopSelectedIndex],
    [workshopSelectedIndex, workshops]
  )
  const [format, setFormat] = useState('docx')
  const [referent, setReferent] = useState({ name: '', mail: '', tel: '' })

  useEffect(() => {
    Http.get('/band').then((groups) => setGroups(groups))
    Http.get('/workshop').then((groups) => setworkshops(groups))
  }, [])

  const submit = () =>
    axios({
      url: '/api/fdr/get-fdr',
      method: 'POST',
      responseType: 'blob', // important
      data: {
        format,
        group: groupSelected.id,
        workshop: workshopSelected != null ? workshopSelected.id : null,
        referent,
        balanceTime,
        hosting
      },
      headers: { 'X-AUTH-TOKEN': window.USER_API_KEY }
    }).then((response) => {
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${groupSelected.name}.${format}`)
      document.body.appendChild(link)
      link.click()
    })

  return (
    <CustomForm onSubmit={submit} disabled={groupSelected == null}>
      <div className="form-line">
        <CustomFormField
          label="Nom - Prénom référent.e accueil"
          value={referent.name}
          onChange={(value) =>
            setReferent((prev) => ({ ...prev, name: value }))
          }
        />
        <CustomFormField
          label="Mail référent.e accueil"
          value={referent.mail}
          onChange={(value) =>
            setReferent((prev) => ({ ...prev, mail: value }))
          }
        />
        <CustomFormField
          label="Téléphone référent.e accueil"
          value={referent.tel}
          onChange={(value) => setReferent((prev) => ({ ...prev, tel: value }))}
        />
      </div>
      <CustomFormField
        label="Groupe"
        options={groups.map((g, index) => ({
          ...g,
          label: g.name,
          value: index
        }))}
        value={groupSelectedIndex}
        onChange={({ value }) => setGroupSelectedIndex(value)}
        type="select"
      />

      <FDRArtistsTable
        artists={groupSelected != null ? groupSelected.artists : []}
        setHosting={setHosting}
        isBandSelected={groupSelected != null}
      />
      {groupSelected != null && (
        <>
          <CustomFormField
            label="Associer un stage"
            options={workshops.map((g, index) => ({
              ...g,
              label: g.name,
              value: index
            }))}
            value={workshopSelectedIndex}
            onChange={({ value }) => setWorkshopSelectedIndex(value)}
            type="select"
          />
          <CustomFormField
            label="Horaire de balances"
            type="time"
            value={balanceTime}
            onChange={setBalanceTime}
          />
          <CustomFormField
            label="Format"
            type="radio"
            value={format}
            onChange={(value) => setFormat(value)}
            options={[
              { value: 'docx', label: 'docx' },
              { value: 'pdf', label: 'pdf' }
            ]}
          />
        </>
      )}
      {groupSelected != null && groupSelected.room === null && (
        <p className="alert alert-danger">
          Le groupe sélectionné n'est pas associé à un lieu de concert ou de bal
          dans le tableau de programmation
        </p>
      )}
      {workshopSelected != null && workshopSelected.room === null && (
        <p className="alert alert-danger">
          Le stage sélectionné n'est pas associé à une salle dans le tableau
          des stages
        </p>
      )}
    </CustomForm>
  )
}

export default FDRForm
