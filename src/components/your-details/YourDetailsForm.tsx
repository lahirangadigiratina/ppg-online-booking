import { useState } from 'react'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { VerifiedMobileField } from '../form/VerifiedMobileField'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'

type YourDetailsFormProps = {
  onBack: () => void
  onContinue: () => void
}

export function YourDetailsForm({ onBack, onContinue }: YourDetailsFormProps) {
  const [mobileVerified, setMobileVerified] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitError(null)

        const form = event.currentTarget
        const data = new FormData(form)
        const firstName = String(data.get('firstName') ?? '').trim()
        const lastName = String(data.get('lastName') ?? '').trim()
        const email = String(data.get('email') ?? '').trim()

        if (!mobileVerified) {
          setSubmitError('Verify your mobile number before continuing.')
          return
        }
        if (!firstName) {
          setSubmitError('First name is required.')
          return
        }
        if (!lastName) {
          setSubmitError('Last name is required.')
          return
        }
        if (!email) {
          setSubmitError('Email address is required.')
          return
        }

        onContinue()
      }}
      footer={
        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" />
        </FormStepFooter>
      }
    >
      <StepHeading compact step={3} title="Your Details" bracket="Sender" />

      <VerifiedMobileField
        onVerifiedChange={(verified) => {
          setMobileVerified(verified)
          if (verified) {
            setSubmitError(null)
          }
        }}
      />

      {submitError ? (
        <p className="text-xs text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}

      <FormField label="Business Name (optional)" htmlFor="businessName">
        <TextInput
          id="businessName"
          name="businessName"
          type="text"
          placeholder="Hubbed"
          autoComplete="organization"
        />
      </FormField>

      <FormField
        label={
          <>
            First Name <span className="text-red-500">*</span>
          </>
        }
        htmlFor="firstName"
      >
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Jane"
          autoComplete="given-name"
        />
      </FormField>

      <FormField
        label={
          <>
            Last Name <span className="text-red-500">*</span>
          </>
        }
        htmlFor="lastName"
      >
        <TextInput
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Smith"
          autoComplete="family-name"
        />
      </FormField>

      <FormField
        label={
          <>
            Email address <span className="text-red-500">*</span>
          </>
        }
        htmlFor="email"
      >
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
        />
      </FormField>
    </BookingStepShell>
  )
}
