import { CustomFormField } from '@b-cedric/react-common-bootstrap'
import { CustomModal } from '@b-cedric/react-common-bootstrap/modal'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import { mdiAccountMultiplePlus, mdiDelete } from '@mdi/js'
import Icon from '@mdi/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const FDRArtistsTable = ({
  artists,
  setHosting,
  isBandSelected,
  addedArtists = [],
  setAddedArtists
}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectArtists, setSelectArtists] = useState([])
  const [selectedArtist, setSelectedArtist] = useState(null)

  useEffect(() => {
    Http.get('/artist').then((artists) => setSelectArtists(artists))
  }, [])

  const deleteAddedArtist = (id) => {
    const copy = [...addedArtists]
    const index = copy.find(({ id: itemId }) => id === itemId)
    copy.splice(index, 1)
    setAddedArtists(copy)
    setHosting((old) => {
      const copy = [...old]
      const index = old.find((i) => i.id === id)
      index != null && copy.splice(index, 1)
      return copy
    })
  }

  const concatArtists = artists.concat(addedArtists)

  return (
    <>
      {concatArtists.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Arrivée</th>
              <th>Départ</th>
              <th>Hébergement</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {concatArtists.map((artist, index) => (
              <tr key={index}>
                <td>{artist.lastname}</td>
                <td>{artist.firstname}</td>
                <td>{moment(artist.dateArrival).format('DD/MM HH[h]mm')}</td>
                <td>{moment(artist.dateDeparture).format('DD/MM HH[h]mm')}</td>
                <td>
                  <CustomFormField
                    onChange={(value) =>
                      setHosting((prev) => {
                        const copy = [...prev]
                        copy[index] = { id: artist.id, value }
                        return copy
                      })
                    }
                  />
                </td>
                <td>
                  {addedArtists.some((a) => a.id === artist.id) && (
                    <Icon
                      title="Supprimer"
                      className="text-danger clickable"
                      size={1}
                      path={mdiDelete}
                      onClick={() => deleteAddedArtist(artist.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
            <tr colSpan="5">
              <Icon
                title="Ajouter un membre"
                className="text-primary clickable"
                path={mdiAccountMultiplePlus}
                size={2}
                onClick={() => setShowAddModal(true)}
              />
            </tr>
          </tbody>
        </table>
      )}
      {concatArtists.length == 0 && isBandSelected && (
        <div>
          <Icon
            title="Ajouter un membre"
            className="text-primary clickable"
            path={mdiAccountMultiplePlus}
            size={2}
            onClick={() => setShowAddModal(true)}
          />
          <p className="informations">
            {' '}
            Aucun artiste de ce groupe n'a été trouvé
          </p>
        </div>
      )}
      <CustomModal
        title="Ajouter un membre"
        content={
          <CustomFormField
            value={selectedArtist}
            type="select"
            options={selectArtists.map((a) => ({
              label: `${a.firstname} ${a.lastname}`,
              value: a.id
            }))}
            onChange={({ value }) => {
              setSelectedArtist(value)
            }}
          />
        }
        show={showAddModal}
        setShow={setShowAddModal}
        onValidate={() => {
          setAddedArtists([
            ...addedArtists,
            selectArtists.find(({ id }) => id === selectedArtist)
          ])
          setSelectedArtist(null)
        }}
      />
    </>
  )
}

export default FDRArtistsTable
