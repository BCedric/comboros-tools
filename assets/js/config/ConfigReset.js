import { Http, useConfirm } from '@b-cedric/react-common-bootstrap'
import React from 'react'

const ConfigReset = () => {
  const confirm = useConfirm()
  const onClick = () =>
    confirm(
      <div>
        <p className='alert alert-danger'>
          Attention, cette action va effacer toutes les données qui ont été
          saisies dans l'outils (excepté la configuration).
        </p>
        <p>Veuillez confirmer la réinitialisation de la base de données</p>
      </div>,
      () => Http.put('/config/reset'),
      'Remise à zero de la base de données'
    )
  return (
    <div className="flex center">
      <button className="btn btn-danger" onClick={onClick}>
        Remise à zero de la base de données
      </button>
    </div>
  )
}

export default ConfigReset
