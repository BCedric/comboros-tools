import { mdiClose, mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import moment from 'moment'
import React from 'react'

const WorkshopLine = ({
  workshop,
  onClickEdit,
  onClickDelete,
  isSameTimeSamePlaceOtherWs
}) => {
  return (
    <li
      className={`flex align-center workshop-line row ${
        isSameTimeSamePlaceOtherWs ? 'text-danger' : ''
      }`}
    >
      <span className="bold col-6">{workshop.name} </span>&nbsp;
      {/* <span className="col"> Le {moment(workshop.start).format('LL')} </span> */}
      {workshop.room != null && (
        <span className="col">{`${workshop.room.label}`}&nbsp;</span>
      )}
      <span className="italic col">
        de {moment(workshop.start).format('LT')} à{' '}
        {moment(workshop.end).format('LT')}
      </span>
      <span className="col">
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
