import moment from 'moment'
import React from 'react'

const FDRArtistsTable = ({ artists }) => {
  return (
    <>
      {artists.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Arrivée</th>
              <th>Départ</th>
              <th>Hébergement</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, index) => (
              <tr key={index}>
                <td>{artist.lastname}</td>
                <td>{artist.firstname}</td>
                <td>{moment(artist.dateArrival).format('DD/MM HH[h]mm')}</td>
                <td>{moment(artist.dateDeparture).format('DD/MM HH[h]mm')}</td>
                <td>
                  {/* <CustomFormField
                    onChange={(value) =>
                      setArtists((prev) => {
                        const copy = [...prev]
                        copy[index] = { ...artist, hosting: value }
                        return copy
                      })
                    }
                  /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {artists.length == 0 && (
        <p className="informations">
          {' '}
          Aucun artiste de ce groupe n'a été trouvé
        </p>
      )}
    </>
  )
}

export default FDRArtistsTable
