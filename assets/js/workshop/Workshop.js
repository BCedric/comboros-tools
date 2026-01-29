import { useConfirm } from '@b-cedric/react-common-bootstrap/modal'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import { mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import WorkshopForm from './WorkshopForm'
import WorkshopLine from './WorkshopLine'

moment.locale('fr')

const Workshop = () => {
  const [workshops, setWorkshops] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formFields, setFormFields] = useState({})

  const confirm = useConfirm()

  const wsSorted = useMemo(
    () =>
      workshops.sort((ws1, ws2) => {
        const momentStart1 = moment(ws1.start)
        const momentStart2 = moment(ws2.start)
        if (momentStart1.isSame(momentStart2)) {
          return ws1.name > ws2.name
        }
        return momentStart1.isAfter(momentStart2)
      }),
    [workshops]
  )
  const daysWS = useMemo(() => {
    const wsMapped = wsSorted.map((ws) => moment(ws.start).format('YYYY-MM-DD'))
    return wsMapped
      .filter((item, pos) => wsMapped.indexOf(item) == pos)
      .map((date) => moment(date))
  }, [workshops])

  useEffect(() => {
    Http.get('/workshop').then((workshops) => setWorkshops(workshops))
  }, [])

  const initFormFields = () =>
    setFormFields({
      name: '',
      description: '',
      level: '',
      date: daysWS.length > 0 ? daysWS[0].format('YYYY-MM-DD') : null,
      time: 'morning'
    })

  useEffect(() => {
    initFormFields()
  }, [daysWS])

  const onClickEdit = (w) => {
    setShowForm(true)
    setFormFields({
      ...w,
      date: moment(w.start).format('YYYY-MM-DD'),
      time: moment(w.start).hours() < 12 ? 'morning' : 'afternoon'
    })
  }

  const onClickDelete = (w) =>
    confirm('Veuillez confirmer la suppression du stage', () =>
      Http.delete(`/workshop/${w.id}`).then(setWorkshops)
    )

  const onSubmit = () => {
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
  }

  const isSameTimeSamePlaceOtherWs = useCallback(
    (ws) =>
      workshops.some(
        (w) => w.id != ws.id && w.room.id === ws.room.id && w.start === ws.start
      ),
    [workshops]
  )

  return (
    <div>
      <div className="flex space-between align-center">
        <div className="flex spaced-inline">
          <h1>Stages</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              initFormFields()
              setShowForm(true)
            }}
          >
            <Icon path={mdiPlus} size={1} />
          </button>
        </div>
        <a className="btn btn-success" href="./export/workshop">
          Exporter au format Excel
        </a>
      </div>
      <div className="flex">
        <div>
          {wsSorted.map((w, k) => (
            <>
              {(wsSorted[k - 1] == null ||
                moment(w.start).format('LL') !=
                  moment(wsSorted[k - 1].start).format('LL')) && (
                <h2>{moment(w.start).format('LL')}</h2>
              )}
              <WorkshopLine
                workshop={w}
                key={k}
                onClickEdit={() => onClickEdit(w)}
                onClickDelete={() => onClickDelete(w)}
                isSameTimeSamePlaceOtherWs={isSameTimeSamePlaceOtherWs(w)}
              />
              {wsSorted[k + 1] != null &&
                !moment(wsSorted[k + 1].start).isSame(w.start) && <br />}
            </>
          ))}
        </div>
        {showForm && (
          <WorkshopForm
            formFields={formFields}
            setFormFields={setFormFields}
            onCancel={() => {
              setShowForm(false)
              initFormFields()
            }}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default Workshop
