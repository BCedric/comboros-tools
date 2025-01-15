import { ConfirmContextProvider } from '@b-cedric/react-common-bootstrap'
import { AlertsContextProvider } from '@b-cedric/react-common-bootstrap/alert'
import React from 'react'
import Router from './Router'
import BandsProvider from './shared/BandsProvider'

const Root = () => {
  return (
    <AlertsContextProvider>
      <BandsProvider>
        <ConfirmContextProvider>
          <div>
            <Router />
          </div>
        </ConfirmContextProvider>
      </BandsProvider>
    </AlertsContextProvider>
  )
}

export default Root
