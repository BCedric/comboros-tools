import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import { mdiClose, mdiContentCopy } from '@mdi/js'
import Icon from '@mdi/react'
import copy from 'copy-to-clipboard'
import React from 'react'

const BandDetails = ({ close, band }) => {
  return (
    <div className="band-details">
      <div className=" flex space-between">
        <span className="band-details-title">{band.name}</span>
        <Icon
          className="clickable"
          path={mdiClose}
          size={1}
          onClick={() => close()}
        />
      </div>
      <div>
        <span className="label">
          Lien vers le formulaire des éléments de communication:
        </span>
        <CustomFormField
          value={`${window.location.origin}/#/com-form/${band.formComAccessCode}`}
          disabled={true}
          suffix={
            <Icon
              className="clickable"
              path={mdiContentCopy}
              size={1}
              title="Copier le lien"
              onClick={() =>
                copy(
                  `${window.location.origin}/#/com-form/${band.formComAccessCode}`
                )
              }
            />
          }
        />
      </div>
      <div>
        <h3>Éléments de communication</h3>
        <div>
          <span className="label">Presentation:</span>
          <p>{band.presentation}</p>
        </div>
        <div>
          <span className="label">Membres:</span>
          <p>{band.members}</p>
        </div>
        <div>
          <span className="label">Lien vers les ressources numériques:</span>
          <p>{band.link}</p>
        </div>
        <div>
          <span className="label">Autres éléments de communication:</span>
          <p>{band.otherElements}</p>
        </div>
        <div>
          <span className="label">Photos:</span>
          <div>
            {band.imgs.map((img, index) => (
              <img
                className="band-detail-img"
                key={index}
                src={`${window.location.origin}/api/band/img/${img}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BandDetails
