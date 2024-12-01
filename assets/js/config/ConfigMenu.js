import React from 'react'
import { Link } from 'react-router-dom'

const ConfigMenu = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to="/config">
          Cession
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/config/guso">
          Guso
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/config/tech">
          Techniciens
        </Link>
      </li>
    </ul>
  )
}

export default ConfigMenu
