import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const FDRMenu = () => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="">
            Génération des FDR
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orphan-artists">
            Gestion artistes orphelin
          </Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}

export default FDRMenu
