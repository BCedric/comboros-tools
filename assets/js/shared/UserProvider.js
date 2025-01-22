import { Http } from '@b-cedric/react-common-bootstrap'
import { useAlertsContext } from '@b-cedric/react-common-bootstrap/alert'
import moment from 'moment'
import React, { useContext, useEffect, useMemo, useState } from 'react'

const UserContext = React.createContext()
const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => {
    const session = JSON.parse(localStorage.getItem('session'))
    if (session != null && moment(session.time).add(1, 'h') > moment()) {
      return true
    }
    return false
  })

  const { addAlert } = useAlertsContext()

  const user = useMemo(() => {
    const session = JSON.parse(localStorage.getItem('session'))
    return isLogged ? session.user : null
  }, [isLogged])

  useEffect(() => {
    if (isLogged) {
      window.USER_API_KEY = user.accessToken
    } else {
      localStorage.removeItem('session')
    }
  }, [isLogged])

  const login = (fields) =>
    Http.put('/user/auth', fields).then((res) => {
      if (res != false) {
        localStorage.setItem(
          'session',
          JSON.stringify({ user: res, time: moment() })
        )
        setIsLogged(true)
      } else {
        addAlert(
          'Erreur de connexion (mauvais login ou mot de passe)',
          'danger'
        )
      }
    })

  const contextValue = useMemo(
    () => ({
      isLogged,
      login,
      user,
      isAdmin: user != null ? user.roles.includes('ROLE_ADMIN') : false,
      isUser: user != null,
      logout: () => {
        setIsLogged(false)
      }
    }),
    [user, isLogged]
  )

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export default UserProvider
export const useUserContext = () => useContext(UserContext)
