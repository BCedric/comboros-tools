import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { AdminRoute } from './AdminRoute'
import { ProtectedRoute } from './ProtectedRoute'
import ComForm from './com-form/ComForm'
import ConfigArtisteAnswer from './config/ConfigArtisteAnswer'
import ConfigFDR from './config/ConfigFDR'
import ConfigReset from './config/ConfigReset'
import ConfigTech from './config/ConfigTech'
// import ConfigVolunteers from './config/ConfigVolunteers'
import InitConfig from './config/InitConfig'
import FDR from './fdr/FDR'
import FDRMenu from './fdr/FDRMenu'
import OrphanArtists from './fdr/OrphanArtists'
import Prog from './prog/Prog'
import Workshop from './workshop/Workshop'

const router = createHashRouter([
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <FDRMenu />,
        children: [
          {
            path: '',
            element: <FDR />
          },
          {
            path: 'orphan-artists',
            element: <OrphanArtists />
          }
        ]
      },

      {
        path: 'prog',
        element: <Prog />
      },
      {
        path: 'workshop',
        element: <Workshop />
      },

      {
        path: '/config',
        element: (
          <AdminRoute>
            <InitConfig />
          </AdminRoute>
        ),
        children: [
          {
            path: '',
            element: <ConfigFDR />
          },
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
          },
          {
            path: 'reset',
            element: <ConfigReset />
          }
        ]
      }
    ]
  },
  {
    path: 'com-form/:accessCode',
    element: (
      <div className="content-unprotected">
        <ComForm />
      </div>
    )
  }
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
