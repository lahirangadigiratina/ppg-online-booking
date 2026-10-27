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

type FieldErrors = {
  mobile?: string
  firstName?: string
  lastName?: string
  email?: string
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function YourDetailsForm({ onBack, onContinue }: YourDetailsFormProps) {
  const [mobileVerified, setMobileVerified] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function clearFieldError(key: keyof FieldErrors) {
    setFieldErrors((previous) => {
      if (!previous[key]) {
        return previous
      }
      const next = { ...previous }
      delete next[key]
      return next
    })
  }

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()

        const form = event.currentTarget
        const data = new FormData(form)
        const firstName = String(data.get('firstName') ?? '').trim()
        const lastName = String(data.get('lastName') ?? '').trim()
        const email = String(data.get('email') ?? '').trim()

        const errors: FieldErrors = {}

        if (!mobileVerified) {
          errors.mobile = 'Verify your mobile number before continuing.'
        }
        if (!firstName) {
          errors.firstName = 'First name is required.'
        }
        if (!lastName) {
          errors.lastName = 'Last name is required.'
        }
        if (!email) {
          errors.email = 'Email address is required.'
        } else if (!isValidEmail(email)) {
          errors.email = 'Enter a valid email address.'
        }

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors)
          return
        }

        setFieldErrors({})
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
        error={fieldErrors.mobile}
        onVerifiedChange={(verified) => {
          setMobileVerified(verified)
          if (verified) {
            clearFieldError('mobile')
          }
        }}
      />

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
        error={fieldErrors.firstName}
      >
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Jane"
          autoComplete="given-name"
          onChange={() => clearFieldError('firstName')}
        />
      </FormField>

      <FormField
        label={
          <>
            Last Name <span className="text-red-500">*</span>
          </>
        }
        htmlFor="lastName"
        error={fieldErrors.lastName}
      >
        <TextInput
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Smith"
          autoComplete="family-name"
          onChange={() => clearFieldError('lastName')}
        />
      </FormField>

      <FormField
        label={
          <>
            Email address <span className="text-red-500">*</span>
          </>
        }
        htmlFor="email"
        error={fieldErrors.email}
      >
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          onChange={() => clearFieldError('email')}
        />
      </FormField>
    </BookingStepShell>
  )
}
