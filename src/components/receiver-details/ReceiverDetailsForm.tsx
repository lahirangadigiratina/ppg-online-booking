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

export function ReceiverDetailsForm({
  onBack,
  onContinue,
}: ReceiverDetailsFormProps) {
  return (
    <BookingStepShell
      scrollableBody={false}
      onSubmit={(event) => {
        event.preventDefault()
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
      >
        <TextInput
          id="receiverFirstName"
          name="receiverFirstName"
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
        htmlFor="receiverLastName"
      >
        <TextInput
          id="receiverLastName"
          name="receiverLastName"
          type="text"
          placeholder="Smith"
          autoComplete="family-name"
        />
      </FormField>

      <FormField
        label={
          <>
            Email <span className="text-red-500">*</span>
          </>
        }
        htmlFor="receiverEmail"
      >
        <TextInput
          id="receiverEmail"
          name="receiverEmail"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
        />
      </FormField>

      <FormField
        label={
          <>
            Mobile <span className="text-red-500">*</span>
          </>
        }
        htmlFor="receiverMobile"
      >
        <TextInput
          id="receiverMobile"
          name="receiverMobile"
          type="tel"
          placeholder="+61 412 345 678"
          autoComplete="tel"
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
