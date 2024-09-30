import { Http } from '@b-cedric/react-common-bootstrap'
import React, { useEffect, useState } from 'react'
import Config from './Config'

const InitConfig = () => {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    Http.get('/config').then((c) => setConfig(c))
  }, [])
  return <>{config != null && <Config config={config} />}</>
}

export default InitConfig
