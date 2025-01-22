import {
  mdiCog,
  mdiFileDocumentOutline,
  mdiHumanFemaleDance,
  mdiLogout,
  mdiMusic
} from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { useUser, useUserContext } from './shared/UserProvider'

const Menu = () => {
  const isConfig = useMatch('/config*')
  const isProg = useMatch('/prog*')
  const isWorkshop = useMatch('/workshop*')
  const isHome = useMatch('/')

  const { isAdmin, logout } = useUserContext()

  return (
    <div className="menu">
      <h2>Outils Comboros</h2>
      <div className='flex center'>

      <Icon
        className="clickable"
        path={mdiLogout}
        size={1}
        title="Déconnexion"
        onClick={logout}
      />
      </div>
      <hr />
      <ul>
        <li>
          <Link
            className={`${isHome ? 'active' : ''}`}
            aria-current="page"
            to=""
          >
            <Icon path={mdiFileDocumentOutline} size={1} />
            <span>Feuilles de route</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${isProg ? 'active' : ''}`}
            aria-current="page"
            to="/prog"
          >
            <Icon path={mdiMusic} size={1} />
            <span>Programmation</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${isWorkshop ? 'active' : ''}`}
            aria-current="page"
            to="/workshop"
          >
            <Icon path={mdiHumanFemaleDance} size={1} />
            <span>Ateliers</span>
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link className={`${isConfig ? 'active' : ''}`} to="/config">
              <Icon path={mdiCog} size={1} />
              <span>Configuration</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Menu
