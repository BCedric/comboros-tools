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

  const [groupSelectedIndex, setGroupSelectedIndex] = useState(null)
  const groupSelected = useMemo(
    () => groups[groupSelectedIndex],
    [groupSelectedIndex, groups]
  )
  const [format, setFormat] = useState('docx')
  const [referent, setReferent] = useState({ name: '', mail: '', tel: '' })

  useEffect(() => {
    Http.get('/fdr/band').then((groups) => setGroups(groups))
  }, [])

  const submit = () =>
    axios({
      url: '/api/fdr/get-fdr',
      method: 'POST',
      responseType: 'blob', // important
      data: {
        format,
        group: groupSelected.id,
        referent
      }
    }).then((response) => {
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${groupSelected.name}.${format}`)
      document.body.appendChild(link)
      link.click()
    })

  return (
    <CustomForm onSubmit={submit}>
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
      />
      {groupSelected != null && (
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
      )}
    </CustomForm>
  )
}

export default FDRForm
