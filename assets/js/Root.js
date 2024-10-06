import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './Menu'

const Root = () => {
  return (
    <div>
      <div className="flex ">
        <Menu />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root
