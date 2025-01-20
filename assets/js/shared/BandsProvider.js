import { Http } from '@b-cedric/react-common-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import { useUser } from './useUser'

const BandsContext = React.createContext(null)

const BandsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [bands, setBands] = useState([])

  const { isUser, user } = useUser()

  useEffect(() => {
    if (isUser) {
      Http.get('/band').then((bands) => (setBands(bands), setIsLoading(false)))
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <BandsContext.Provider value={{ bands, setBands }}>
      {!isLoading && children}
    </BandsContext.Provider>
  )
}

export const useBandsContext = () => useContext(BandsContext)

export default BandsProvider
