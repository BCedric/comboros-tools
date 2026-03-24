import { CustomFormField } from '@b-cedric/react-common-bootstrap/form'
import { TableSearch } from '@b-cedric/react-common-bootstrap/list'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import { mdiContentCopy, mdiPen } from '@mdi/js'
import Icon from '@mdi/react'
import copy from 'copy-to-clipboard'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
      <div className="flex space-between align-center">
        <h1>Réponses du formulaire Accueil artistes</h1>
        <button className="btn btn-success" onClick={onClickExport}>
          Exporter au format Excel
        </button>
      </div>

      <div>
        <span className="label">Lien vers le formulaire :</span>
        <CustomFormField
          value={`${window.location.origin}/#/artist/form`}
          disabled={true}
          suffix={
            <Icon
              className="clickable"
              path={mdiContentCopy}
              size={1}
              title="Copier le lien"
              onClick={() => copy(`${window.location.origin}/#/artist/form`)}
            />
          }
        />
      </div>

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
        actions={[
          (a) => (
            <Link
              to={`/artist/form/${a.formAccessCode}`}
              title={`Editer la réponse de ${a.firstname} ${a.lastname}`}
            >
              <Icon path={mdiPen} size={1}></Icon>
            </Link>
          )
        ]}
      />
    </div>
  )
}

export default ArtistsTable
