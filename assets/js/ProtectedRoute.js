import React from 'react'
import Login from './Login'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  return (
    <Login>
      <div className="flex ">
        <Menu />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </Login>
  )
}
