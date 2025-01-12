import { AlertsContextProvider } from '@b-cedric/react-common-bootstrap/alert'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Login'
import Menu from './Menu'
import BandsProvider from './shared/BandsProvider'
import Router from './Router'

const Root = () => {
  return (
    <AlertsContextProvider>
      <BandsProvider>
        <div>
         <Router />
        </div>
      </BandsProvider>
    </AlertsContextProvider>
  )
}

export default Root
