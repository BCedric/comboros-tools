import { CustomForm, CustomFormField } from '@b-cedric/react-common-bootstrap'
import React, { useState } from 'react'
import { useUserContext } from './shared/UserProvider'

const Login = ({ children }) => {
  const [fields, setFields] = useState({
    login: '',
    password: ''
  })

  const { isLogged, login } = useUserContext()

  return (
    <>
      {isLogged ? (
        children
      ) : (
        <CustomForm
          formFields={fields}
          setFormFields={setFields}
          onSubmit={() => {
            login(fields)
          }}
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
