import { ConfirmContextProvider } from '@b-cedric/react-common-bootstrap'
import { AlertsContextProvider } from '@b-cedric/react-common-bootstrap/alert'
import React from 'react'
import Router from './Router'
import BandsProvider from './shared/BandsProvider'
import UserProvider from './shared/UserProvider'

const Root = () => {
  return (
    <AlertsContextProvider>
      <UserProvider>
        <BandsProvider>
          <ConfirmContextProvider>
            <div>
              <Router />
            </div>
          </ConfirmContextProvider>
        </BandsProvider>
      </UserProvider>
    </AlertsContextProvider>
  )
}

export default Root
