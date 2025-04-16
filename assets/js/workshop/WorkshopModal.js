import {
  CustomFormField,
  CustomFormFieldInputList
} from '@b-cedric/react-common-bootstrap/form'
import { CustomModal } from '@b-cedric/react-common-bootstrap/modal'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import moment from 'moment'
import React from 'react'
import RoomFormField from '../shared/RoomFormField'

const WorkshopModal = ({
  show,
  setShow,
  formFields,
  setFormFields,
  setWorkshops,
  initFormFields
}) => {
  return (
    <CustomModal
      title={`${formFields.id != null ? 'Modification' : 'Ajout'} d'un stage`}
      show={show}
      setShow={setShow}
      onValidate={() => {
        return Http.post('/workshop', {
          ...formFields,
          room: formFields.room != null ? formFields.room.id : null,
          start: moment(
            `${formFields.date} ${
              formFields.time === 'morning' ? '10:00' : '14:30'
            }`
          ).format(),
          end: moment(
            `${formFields.date} ${
              formFields.time === 'morning' ? '13:00' : '17:30'
            }`
          ).format()
        })
          .then((list) => setWorkshops(list))
          .then(() => initFormFields())
      }}
      onCancel={() => initFormFields()}
      content={
        <div>
          <CustomFormField
            label="Intitulé du stage"
            value={formFields.name}
            onChange={(value) => setFormFields({ ...formFields, name: value })}
          />
          <CustomFormField
            label="Date"
            type="date"
            value={formFields.date}
            onChange={(value) => setFormFields({ ...formFields, date: value })}
          />
          <CustomFormField
            label="Demi-journée"
            type="select"
            options={[
              { label: 'Matin', value: 'morning' },
              { label: 'Après-Midi', value: 'afternoon' }
            ]}
            value={formFields.time}
            onChange={({ value }) =>
              setFormFields({ ...formFields, time: value })
            }
          />

          <RoomFormField
            value={formFields.room == null ? null : formFields.room.id}
            onChange={(event) => setFormFields({ ...formFields, room: event })}
          />
          <CustomFormField
            label="Descriptif"
            value={formFields.description}
            onChange={(value) =>
              setFormFields({ ...formFields, description: value })
            }
            type="textarea"
          />
          <CustomFormFieldInputList
            label="Intervenants"
            value={formFields.speakers == null ? [] : formFields.speakers}
            onChange={(value) =>
              setFormFields({ ...formFields, speakers: value })
            }
          />
          <CustomFormField
            label="Niveau attendu"
            value={formFields.level}
            onChange={(value) => setFormFields({ ...formFields, level: value })}
          />
          <CustomFormField
            label="Jauge"
            value={formFields.gauge == null ? 0 : formFields.gauge}
            onChange={(value) => setFormFields({ ...formFields, gauge: value })}
            type="number"
          />
        </div>
      }
    />
  )
}

export default WorkshopModal
