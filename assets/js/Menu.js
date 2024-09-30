import React from 'react'
import { Link, useMatch } from 'react-router-dom'

const Menu = () => {
  const isConfigTech = useMatch('/config-tech')
  const isConfig = useMatch('/config')
  const isHome = useMatch('/')

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`nav-link ${isHome ? 'active' : ''}`}
            aria-current="page"
            to=""
          >
            Feuilles de route
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${isConfig ? 'active' : ''}`} to="/config">
            Config
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${isConfigTech ? 'active' : ''}`}
            to="/config-tech"
          >
            Config Techniciens
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu
