import { TableSearch } from '@b-cedric/react-common-bootstrap/list'
import moment from 'moment'
import React from 'react'

const ProgTable = ({ bands }) => {
  return (
    <div>
      <TableSearch
        items={bands}
        filter={(band, search) =>
          band.name.includes(search) ||
          (band.members != null &&  band.members.includes(search))
        }
        fields={[
          { label: 'Nom', get: (band) => band.name },
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
          { label: 'Présentation', get: (band) => band.presentation },
          { label: 'Membres', get: (band) => band.members },
          {
            label: 'Lien vers les ressources numériques',
            get: (band) => band.link
          },
          {
            label: 'Autres éléments de communication',
            get: (band) => band.otherElements
          },
          {
            label: 'Photos',
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
      {/* <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Artistes</th>
            <th>Heure de début</th>
            <th>Heure de fin</th>
            <th>Lieu</th>
            <th>Présentation</th>
            <th>Membres</th>
            <th>Lien vers les ressources numériques</th>
            <th>Autres éléments de communication</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band, index) => (
            <tr>
              <td>{band.name}</td>
              <td>
                {band.artists
                  .map((a) => `${a.firstname} ${a.lastname}`)
                  .join(', ')}
              </td>
              <td>{moment(band.start).format('Do MMMM YYYY, H:mm:ss ')}</td>
              <td>{moment(band.end).format('Do MMMM YYYY, H:mm:ss ')}</td>
              <td>{band.room.label}</td>
              <td>{band.presentation}</td>
              <td>{band.members}</td>
              <td>{band.link}</td>
              <td>{band.otherElements}</td>
              <td>
                {band.imgs.map((img, index) => (
                  <img
                    className="band-detail-img"
                    key={index}
                    src={`${window.location.origin}/api/band/img/${img}`}
                  />
                ))}
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table> */}
    </div>
  )
}

export default ProgTable
