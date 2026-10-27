import { useState } from 'react'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'

type ReceiverDetailsFormProps = {
  onBack: () => void
  onContinue: () => void
}

type FieldErrors = {
  firstName?: string
  lastName?: string
  email?: string
  mobile?: string
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function ReceiverDetailsForm({
  onBack,
  onContinue,
}: ReceiverDetailsFormProps) {
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
      scrollableBody={false}
      onSubmit={(event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const firstName = String(data.get('receiverFirstName') ?? '').trim()
        const lastName = String(data.get('receiverLastName') ?? '').trim()
        const email = String(data.get('receiverEmail') ?? '').trim()
        const mobile = String(data.get('receiverMobile') ?? '').trim()

        const errors: FieldErrors = {}

        if (!firstName) {
          errors.firstName = 'First name is required.'
        }
        if (!lastName) {
          errors.lastName = 'Last name is required.'
        }
        if (!email) {
          errors.email = 'Email is required.'
        } else if (!isValidEmail(email)) {
          errors.email = 'Enter a valid email address.'
        }
        if (!mobile) {
          errors.mobile = 'Mobile is required.'
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
      <StepHeading compact step={4} title="Receiver Details" />

      <FormField label="Business Name (optional)" htmlFor="receiverBusinessName">
        <TextInput
          id="receiverBusinessName"
          name="receiverBusinessName"
          type="text"
          placeholder="Jane's Bookstore"
          autoComplete="organization"
        />
      </FormField>

      <FormField
        label={
          <>
            First Name <span className="text-red-500">*</span>
          </>
        }
        htmlFor="receiverFirstName"
        error={fieldErrors.firstName}
      >
        <TextInput
          id="receiverFirstName"
          name="receiverFirstName"
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
        htmlFor="receiverLastName"
        error={fieldErrors.lastName}
      >
        <TextInput
          id="receiverLastName"
          name="receiverLastName"
          type="text"
          placeholder="Smith"
          autoComplete="family-name"
          onChange={() => clearFieldError('lastName')}
        />
      </FormField>

      <FormField
        label={
          <>
            Email <span className="text-red-500">*</span>
          </>
        }
        htmlFor="receiverEmail"
        error={fieldErrors.email}
      >
        <TextInput
          id="receiverEmail"
          name="receiverEmail"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          onChange={() => clearFieldError('email')}
        />
      </FormField>

      <FormField
        label={
          <>
            Mobile <span className="text-red-500">*</span>
          </>
        }
        htmlFor="receiverMobile"
        error={fieldErrors.mobile}
      >
        <TextInput
          id="receiverMobile"
          name="receiverMobile"
          type="tel"
          placeholder="+61 412 345 678"
          autoComplete="tel"
          onChange={() => clearFieldError('mobile')}
        />
      </FormField>

      <label className="flex shrink-0 cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          name="skipReceiverNotifications"
          className="mt-0.5 size-4 shrink-0 rounded border-ppg-border accent-ppg-orange"
        />
        <span className="text-xs leading-snug text-ppg-label">
          Don&apos;t send tracking notifications to the receiver
        </span>
      </label>
    </BookingStepShell>
  )
}
