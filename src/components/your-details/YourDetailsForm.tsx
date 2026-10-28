import { useMemo, useState } from 'react'
import {
  hasRequiredText,
  isValidEmail,
} from '../form/formValidation'
import {
  initialAuMobileDisplay,
  isCompleteAuMobile,
} from '../form/auMobileInput'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { VerifiedMobileField } from '../form/VerifiedMobileField'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import { lookupSenderByMobile } from './senderDetailsLookup'

type YourDetailsFormProps = {
  onBack: () => void
  onContinue: () => void
}

export function YourDetailsForm({ onBack, onContinue }: YourDetailsFormProps) {
  const [mobile, setMobile] = useState(initialAuMobileDisplay)
  const [mobileError, setMobileError] = useState<string | null>(null)
  const [businessName, setBusinessName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileLookupMessage, setMobileLookupMessage] = useState<string | null>(
    null,
  )

  function handleMobileLookup(phone: string) {
    if (!phone) {
      setMobileError('Enter a valid Australian mobile number.')
      setMobileLookupMessage(null)
      return
    }
    setMobileError(null)

    const saved = lookupSenderByMobile(phone)
    if (!saved) {
      setMobileLookupMessage(null)
      return
    }

    setBusinessName(saved.businessName ?? '')
    setFirstName(saved.firstName)
    setLastName(saved.lastName)
    setEmail(saved.email)
    setMobileLookupMessage('We found your saved details and filled them in.')
  }

  const canContinue = useMemo(
    () =>
      isCompleteAuMobile(mobile) &&
      hasRequiredText(firstName) &&
      hasRequiredText(lastName) &&
      isValidEmail(email),
    [email, firstName, lastName, mobile],
  )

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = mobile.trim()
        if (!canContinue) {
          if (!isCompleteAuMobile(trimmed)) {
            setMobileError('Enter a valid Australian mobile number.')
          }
          return
        }
        setMobileError(null)
        onContinue()
      }}
      footer={
        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" disabled={!canContinue} />
        </FormStepFooter>
      }
    >
      <StepHeading compact step={3} title="Your Details" bracket="Sender" />

      <div className="flex flex-col gap-1">
        <VerifiedMobileField
          value={mobile}
          onChange={(next) => {
            setMobile(next)
            setMobileError(null)
            setMobileLookupMessage(null)
          }}
          onLookup={handleMobileLookup}
          error={mobileError}
        />
        {mobileLookupMessage ? (
          <p className="text-[11px] leading-snug text-ppg-verified">
            {mobileLookupMessage}
          </p>
        ) : null}
      </div>

      <FormField label="Business Name (optional)" htmlFor="businessName">
        <TextInput
          id="businessName"
          name="businessName"
          type="text"
          placeholder="Hubbed"
          autoComplete="organization"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
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
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
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
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormField>
    </BookingStepShell>
  )
}
