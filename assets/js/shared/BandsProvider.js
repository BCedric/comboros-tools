import { Http } from '@b-cedric/react-common-bootstrap'
import React, { useContext, useEffect, useState } from 'react'

const BandsContext = React.createContext(null)

const BandsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [bands, setBands] = useState([])

  useEffect(() => {
    Http.get('/fdr/band').then(
      (bands) => (setBands(bands), setIsLoading(false))
    )
  }, [])

  return (
    <BandsContext.Provider value={{ bands, setBands }}>
      {!isLoading && children}
    </BandsContext.Provider>
  )
}

export const useBandsContext = () => useContext(BandsContext)

export default BandsProvider
