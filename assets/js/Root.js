import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './Menu'

const Root = () => {
  return (
    <div>
      <h1>Outils Comboros</h1>
      <Menu />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default Root
