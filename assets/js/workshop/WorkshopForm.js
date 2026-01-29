import {
  CustomForm,
  CustomFormField,
  CustomFormFieldInputList
} from '@b-cedric/react-common-bootstrap/form'
import React from 'react'
import RoomFormField from '../shared/RoomFormField'

const WorkshopForm = ({ formFields, setFormFields, onCancel, onSubmit }) => {
  return (
    <CustomForm
      onCancel={onCancel}
      className="flex1 workshop-form"
      onSubmit={onSubmit}
    >
      <CustomFormField
        label="Intitulé du stage"
        value={formFields.name}
        onChange={(value) => setFormFields({ ...formFields, name: value })}
      />
      <CustomFormField
        type="select"
        options={['Musique', 'Danse'].map((value) => ({
          label: value,
          value
        }))}
        value={formFields.type}
        onChange={({ value }) => setFormFields({ ...formFields, type: value })}
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
        onChange={({ value }) => setFormFields({ ...formFields, time: value })}
      />

      <RoomFormField
        value={formFields.room == null ? null : formFields.room.id}
        onChange={(event) => setFormFields({ ...formFields, room: event })}
      />
      <CustomFormField
        label="Descriptif"
        className="workshop-description"
        value={formFields.description}
        onChange={(value) =>
          setFormFields({ ...formFields, description: value })
        }
        type="textarea"
      />
      <CustomFormFieldInputList
        label="Intervenants"
        value={formFields.speakers == null ? [] : formFields.speakers}
        onChange={(value) => setFormFields({ ...formFields, speakers: value })}
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
    </CustomForm>
  )
}

export default WorkshopForm
