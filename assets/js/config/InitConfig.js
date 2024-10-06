import { Http } from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ConfigMenu from './ConfigMenu'

const InitConfig = () => {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    Http.get('/config').then((c) => setConfig(c))
  }, [])
  return (
    <>
      <ConfigMenu />
      <hr />
      {config != null && <Outlet context={config} />}
    </>
  )
}

export default InitConfig
