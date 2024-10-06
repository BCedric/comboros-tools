import { mdiCog, mdiFileDocumentOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Link, useMatch } from 'react-router-dom'

const Menu = () => {
  const isConfig = useMatch('/config*')
  const isHome = useMatch('/')

  return (
    <div className="menu">
      <h2>Outils Comboros</h2>
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
          <Link className={`${isConfig ? 'active' : ''}`} to="/config">
            <Icon path={mdiCog} size={1} />
            <span>Configuration</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu
