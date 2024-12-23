import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from './Menu'
import BandsProvider from './shared/BandsProvider'
import { AlertsContextProvider } from '@b-cedric/react-common-bootstrap/alert'

const Root = () => {
  return (
    <AlertsContextProvider>
      <BandsProvider>
        <div>
          <div className="flex ">
            <Menu />
            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      </BandsProvider>
    </AlertsContextProvider>
  )
}

export default Root
