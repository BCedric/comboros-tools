import React from 'react'
import comborosAvatar from '../../img/Insta-publication2.jpg'

const ComFormValidation = () => {
  return (
    <div>
      <div className='flex center'>
        <img src={comborosAvatar} className="form-header-img" />
      </div>
      <p className="informations" style={{margin: '1em 0'}}>
        Les informations ont bien été enregistrées. Vous pouvez modifier les
        valeurs en retournant sur le lien qui vous a été transmis.
      </p>
      <p className="informations">
        Merci d'avoir pris le temps de remplir ce formulaire.
      </p>
    </div>
  )
}

export default ComFormValidation
