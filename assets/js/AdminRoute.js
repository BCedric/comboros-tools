import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from './shared/useUser'

export const AdminRoute = ({ children }) => {
  const { isAdmin } = useUser()
  useEffect(() => {}, [])

  return <>{isAdmin ? children : <Navigate to={'/'} />}</>
}
