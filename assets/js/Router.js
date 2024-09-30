import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Root from './Root'
import ConfigTech from './config-tech/ConfigTech'
import InitConfig from './config/InitConfig'
import FDR from './fdr/FDR'

const router = createHashRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '',
        element: <FDR />
      },
      {
        path: '/config',
        element: <InitConfig />
      },
      {
        path: '/config-tech',
        element: <ConfigTech />
      }
    ]
  }
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
