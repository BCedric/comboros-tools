import { Http } from '@b-cedric/react-common-bootstrap'
import { useAlertsContext } from '@b-cedric/react-common-bootstrap/alert'
import moment from 'moment'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

const UserContext = React.createContext()
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = JSON.parse(localStorage.getItem('session'))
    if (session != null && moment(session.time).add(1, 'h') > moment()) {
      window.USER_API_KEY = session.user.accessToken
      return session.user
    }
    return null
  })

  const setUserAndAPIKey = useCallback((user) => {
    window.USER_API_KEY = user.accessToken
    setUser(user)
  }, [])

  const setSession = useCallback((session) => {
    if (session == null) {
      setUser(null)
    } else {
      localStorage.setItem('session', JSON.stringify(session))
      setUserAndAPIKey(session.user)
    }
  }, [])

  const isLogged = useMemo(() => user != null, [user])

  useEffect(() => {
    function checkUserData() {
      const session = localStorage.getItem('session')
      console.log('session change', session)
      if (session != null) {
        window.USER_API_KEY = user.accessToken
      }
      setUser(session != null ? session.user : null)
    }
    window.addEventListener('storage', checkUserData)
    return () => {
      window.removeEventListener('storage', checkUserData)
    }
  }, [])

  const { addAlert } = useAlertsContext()

  const login = (fields) =>
    Http.put('/user/auth', fields).then((res) => {
      if (res != false) {
        setSession({ user: res, time: moment() })
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
        setUser(null)
        localStorage.removeItem('session')
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
