import { CustomFormField } from '@b-cedric/react-common-bootstrap/form'
import moment from 'moment'
import React from 'react'

const FDRLaunchFormControl = ({ formfield, setFormField, firstDay }) => {
  const days = [
    { label: 'Jeudi', date: moment(firstDay) },
    { label: 'Vendredi', date: moment(firstDay).add(1, 'days') },
    { label: 'Samedi', date: moment(firstDay).add(2, 'days') },
    { label: 'Dimanche', date: moment(firstDay).add(3, 'days') },
    { label: 'Lundi', date: moment(firstDay).add(4, 'days') }
  ]

  const formatDate = (date) => date.format('DD/MM')

  const addValue = (value) => {
    setFormField([...formfield, value])
  }

  const removeValue = (value) => {
    const copy = [...formfield]
    const index = formfield.findIndex(value)
    copy.slice(index, 1)
    setFormField(copy)
  }
  console.log(formfield)
  return (
    <div>
      <label>Repas pris en charge</label>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            {days.map((d, i) => (
              <th key={i}>
                {d.label} {formatDate(d.date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Midi</td>
            {days.map((d, i) => (
              <td key={i}>
                <CustomFormField
                  type="checkbox"
                  onChange={(value) => {
                    const val = `${d.label} ${formatDate(d.date)} midi`
                    if (value) {
                      addValue(val)
                    } else {
                      removeValue(val)
                    }
                  }}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>Soir</td>
            {days.map((d, i) => (
              <td key={i}>
                <CustomFormField
                  type="checkbox"
                  onChange={(value) => {
                    const val = `${d.label} ${formatDate(d.date)} soir`
                    if (value) {
                      addValue(val)
                    } else {
                      removeValue(val)
                    }
                  }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FDRLaunchFormControl
