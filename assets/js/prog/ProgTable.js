import { TableSearch } from '@b-cedric/react-common-bootstrap/list'
import copy from 'copy-to-clipboard'
import moment from 'moment'
import React from 'react'

const ProgTable = ({ bands }) => {
  return (
    <div className="prog-table">
      <TableSearch
        items={bands}
        filter={(band, search) =>
          band.name.toLowerCase().includes(search.toLowerCase()) ||
          (band.members != null &&
            band.members.toLowerCase().includes(search.toLowerCase()))
        }
        fields={[
          { label: 'Nom', get: (band) => band.name },
          { label: 'Type', get: (band) => band.type },
          {
            label: 'Artistes',
            get: (band) =>
              band.artists.map((a) => `${a.firstname} ${a.lastname}`).join(', ')
          },
          {
            label: 'Heure de début',
            get: (band) => moment(band.start).format('Do MMMM YYYY, H:mm:ss ')
          },
          {
            label: 'Heure de fin',
            get: (band) => moment(band.end).format('Do MMMM YYYY, H:mm:ss ')
          },
          { label: 'Lieu', get: (band) => band.room.label },
          {
            label: 'Présentation',
            get: (band) => (
              <div>
                <p
                  className="prog-table-presentation"
                  title={band.presentation}
                >
                  {band.presentation}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => copy(band.presentation)}
                >
                  Copier
                </button>
              </div>
            )
          },
          { label: 'Membres', get: (band) => band.members },
          {
            label: 'Lien vers les ressources numériques',
            get: (band) => <a href={band.link}>{band.link}</a>,
            className: 'numeric-link'
          },
          {
            label: 'Autres éléments de communication',
            get: (band) => band.otherElements,
            className: 'other-elements'
          },
          {
            label: 'Photos',
            className: 'band-imgs',
            get: (band) =>
              band.imgs.map((img, index) => (
                <img
                  className="band-detail-img"
                  key={index}
                  src={`${window.location.origin}/api/band/img/${img}`}
                />
              ))
          }
        ]}
      />
    </div>
  )
}

export default ProgTable
