import { TableSearch } from '@b-cedric/react-common-bootstrap/list'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const ArtistsTable = () => {
  const [artists, setArtists] = useState([])
  useEffect(() => {
    Http.get('/artist').then((artists) => setArtists(artists))
  }, [])

  const onClickExport = () => {
    Http.downloadFile('/artist/export', null, 'réponses_formulaire_aa.csv')
  }

  return (
    <div>
      <h1>Réponses du formulaire Accueil artistes</h1>
      <button className="btn btn-primary" onClick={onClickExport}>
        Exporter en CSV
      </button>
      <TableSearch
        filter={(item, search) =>
          item.lastname.toLowerCase().includes(search.toLowerCase()) ||
          item.firstname.toLowerCase().includes(search.toLowerCase()) ||
          (item.band != null &&
            item.band.name.toLowerCase().includes(search.toLowerCase()))
        }
        items={artists}
        fields={[
          {
            label: 'Nom',
            get: (a) => a.lastname
          },
          {
            label: 'Prénom',
            get: (a) => a.firstname
          },
          {
            label: 'Groupe / spectacle / conférence',
            get: (a) => (a.band != null ? a.band.name : '')
          },
          {
            label: 'Type de contrat',
            get: (a) => (a.gUSO ? 'GUSO' : 'Cession')
          },
          {
            label: "Date d'arrivée",
            get: (a) => moment(a.dateArrival).format('DD/MM hh:mm')
          },
          {
            label: 'Date de départ',
            get: (a) => moment(a.dateDeparture).format('DD/MM hh:mm')
          }
        ]}
      />
    </div>
  )
}

export default ArtistsTable
