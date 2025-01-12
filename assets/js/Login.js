import {
  CustomForm,
  CustomFormField,
  Http
} from '@b-cedric/react-common-bootstrap'
import { useAlertsContext } from '@b-cedric/react-common-bootstrap/alert'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const Login = ({ children }) => {
  const { addAlert } = useAlertsContext()

  const [fields, setFields] = useState({
    login: '',
    password: ''
  })
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'))
    if (session != null && moment(session.time).add(1, 'h') > moment()) {
      setIsLogged(true)
    }
  }, [])

  const onSubmit = () => {
    Http.put('/user/auth', fields).then((res) => {
      if (res != false) {
        setIsLogged(true)
        localStorage.setItem(
          'session',
          JSON.stringify({ user: res, time: moment() })
        )
      } else {
        addAlert('Erreur de connexion (mauvais login ou mot de passe)', 'danger')
      }
    })
  }

  return (
    <>
      {isLogged ? (
        children
      ) : (
        <CustomForm
          formFields={fields}
          setFormFields={setFields}
          onSubmit={onSubmit}
          className="login-form"
        >
          <CustomFormField label="Login" fieldName="login" />
          <CustomFormField
            label="Mot de passe"
            type="password"
            fieldName="password"
          />
        </CustomForm>
      )}
    </>
  )
}

export default Login
