import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from './shared/UserProvider'

export const AdminRoute = ({ children }) => {
  const { isAdmin } = useUserContext()
  useEffect(() => {}, [])

  return <>{isAdmin ? children : <Navigate to={'/'} />}</>
}
