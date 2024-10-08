import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Root from './Root'
import ConfigTech from './config/ConfigTech'
import ConfigArtisteAnswer from './config/ConfigArtisteAnswer'
import ConfigProgFile from './config/ConfigProgFile'
import ConfigWorkshopFile from './config/ConfigWorkshopFile'
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
        element: <InitConfig />,
        children: [
          { path: '', element: <ConfigProgFile /> },
          { path: 'workshop', element: <ConfigWorkshopFile /> },
          {
            path: 'cession',
            element: (
              <ConfigArtisteAnswer
                formFieldPrefix="cession"
                title="Fichier de réponses avec contrat de cession"
                initFields={{
                  cessionCSV: '',
                  cessionCSVbandName: 0,
                  cessionCSVLastname: 0,
                  cessionCSVFirstname: 0,
                  cessionCSVDateArrival: 0,
                  cessionCSVTimeArrival: 0,
                  cessionCSVDateDeparture: 0,
                  cessionCSVTimeDeparture: 0
                }}
              />
            )
          },
          {
            path: 'guso',
            element: (
              <ConfigArtisteAnswer
                formFieldPrefix="guso"
                title="Fichier de réponses GUSO"
                initFields={{
                  gusoCSV: '',
                  gusoCSVbandName: 0,
                  gusoCSVLastname: 0,
                  gusoCSVFirstname: 0,
                  gusoCSVDateArrival: 0,
                  gusoCSVTimeArrival: 0,
                  gusoCSVDateDeparture: 0,
                  gusoCSVTimeDeparture: 0
                }}
              />
            )
          },
          {
            path: 'tech',
            element: <ConfigTech />
          }
        ]
      }
    ]
  }
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
