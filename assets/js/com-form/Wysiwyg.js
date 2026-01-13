import { useFormContext } from '@b-cedric/react-common-bootstrap/form/CustomForm'
import Quill from 'quill'
import React, { useEffect, useRef } from 'react'

const Wysiwyg = ({ label, value = '', onChange, isValid = true }) => {
    const ref = useRef()
    
 const { displayError, formFields, setFormFields, setFormField } =
   useFormContext()


  useEffect(() => {
    const container = ref.current
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    )
    const quill = new Quill(editorContainer, {
      theme: 'snow'
    })

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onChange(quill.getText())
    })

    if (value != '') {
      quill.setContents([{insert: value}])
    }
    ref.current = quill
  }, [ref])
    
    console.log(isValid);
  return (
    <div className="custom-form-field ">
      {label != '' && <label>{label}</label>}
      <div
        ref={ref}
        className={`wysiwyg form-control ${displayError && !isValid ? 'is-invalid' : ''}`}
      ></div>
    </div>
  )
}

export default Wysiwyg
