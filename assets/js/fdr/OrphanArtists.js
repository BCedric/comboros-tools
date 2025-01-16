import { Http } from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'

const OrphanArtists = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {}, [])

  useEffect(() => {
    Http.get('/config').then((c) => console.log(c))
    Http.get('/artist/orphan').then((res) => setArtists(res))
  }, [])

  const update = () =>
    Http.put('/config/update-artists').then(() =>
      Http.get('/artist/orphan').then((res) => setArtists(res))
    )

  return (
    <>
      <p className="informations">
        Les artistes suivant ne sont rattachés à aucun groupe probablement car
        le nom du groupe n'est pas exactement le même dans cet outil (voir page
        Programmation) et dans le fichier de réponse au formulaire accueil
        artiste (GUSO ou cession). Pour corriger, veuillez aller modifier le
        fichier sur le drive, puis{' '}
        <button className="btn btn-primary" onClick={update}>
          Mettre à jour la liste
        </button>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((a, index) => (
            <tr key={index}>
              <td>{a.firstname}</td>
              <td>{a.lastname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default OrphanArtists
