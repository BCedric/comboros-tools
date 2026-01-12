import { mdiClose, mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import moment from 'moment'
import React from 'react'

const WorkshopLine = ({ workshop, onClickEdit, onClickDelete }) => {
  return (
    <li className="flex align-center workshop-line">
      <span className="bold">{workshop.name} </span>&nbsp;
      <span> Le {moment(workshop.start).format('LL')} </span>&nbsp;
      {workshop.room != null && <span>à {`${workshop.room.label}`}&nbsp;</span>}
      <span className="italic">
        de {moment(workshop.start).format('LT')} à{' '}
        {moment(workshop.end).format('LT')}
      </span>
      <span>
        <Icon
          className="clickable text-info"
          path={mdiPencil}
          size={0.8}
          onClick={onClickEdit}
        />
        <Icon
          className="clickable text-danger"
          path={mdiClose}
          size={0.8}
          onClick={onClickDelete}
        />
      </span>
    </li>
  )
}

export default WorkshopLine
