import { Steps } from '@b-cedric/react-common-bootstrap/form'
import { useConfirm } from '@b-cedric/react-common-bootstrap/modal'
import { Http } from '@b-cedric/react-common-bootstrap/services'
import React, { useCallback, useState } from 'react'
import ArtistsAdminForm from './ArtistsAdminForm'
import ArtistsCommentForm from './ArtistsCommentForm'
import ArtistsCompanionsForm from './ArtistsCompanionsForm'
import ArtistsHostingForm from './ArtistsHostingForm'
import ArtistsMealForm from './ArtistsMealForm'
import ArtistsReceptionForm from './ArtistsReceptionForm'

const ArtistsForm = () => {
  const [formFields, setFormFields] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isEnded, setIsEnded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const prevStep = useCallback(() => setCurrentStep((prev) => prev - 1), [])
  const nextStep = useCallback(() => setCurrentStep((prev) => prev + 1), [])

  const confirm = useConfirm()

  const submit = useCallback((obj) => {
    confirm(
      "Veuillez confirmer l'envoi des réponses. Celles-ci ne seront pas modifiables",
      () =>
        Http.post('/artist', obj)
          .then(() => setIsEnded(true))
          .catch(() => setHasError(true))
    )
  }, [])

  return (
    <div className="artist-form content content-without-menu">
      {!isEnded && !hasError ? (
        <>
          <Steps
            steps={[
              'Administratif',
              'Accueil',
              'Hébergement',
              'Repas',
              'Accompagnateur.ices',
              'Commentaires'
            ]}
            currentStep={currentStep}
          />
          {currentStep === 0 && (
            <ArtistsAdminForm
              globalFormFields={formFields}
              setGlobalFormFields={setFormFields}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {currentStep === 1 && (
            <ArtistsHostingForm
              globalFormFields={formFields}
              setGlobalFormFields={setFormFields}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {currentStep === 2 && (
            <ArtistsReceptionForm
              globalFormFields={formFields}
              setGlobalFormFields={setFormFields}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {currentStep === 3 && (
            <ArtistsMealForm
              globalFormFields={formFields}
              setGlobalFormFields={setFormFields}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {currentStep === 4 && (
            <ArtistsCompanionsForm
              globalFormFields={formFields}
              setGlobalFormFields={setFormFields}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          {currentStep === 5 && (
            <ArtistsCommentForm
              globalFormFields={formFields}
              prevStep={prevStep}
              submit={submit}
            />
          )}
        </>
      ) : (
        <p className="informations">
          {isEnded
            ? "Merci d'avoir pris le temps de répondre à ce questionnaire, et au plaisir de vous voir cet été. D'ici là pour nous joindre : 04 73 63 36 75 ou votre contact au sein de la commission Accueil Artistes"
            : "Une erreur est survenue et nous nous en excusons. Veuillez en informer votre contact en précisant la date et l'heure."}
        </p>
      )}
    </div>
  )
}

export default ArtistsForm
