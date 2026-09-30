import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'

type ReceiverDetailsFormProps = {
  onContinue: () => void
}

export function ReceiverDetailsForm({ onContinue }: ReceiverDetailsFormProps) {
  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <StepHeading step={3} title="Receiver Details" />

        <FormField
          label="Business Name (optional)"
          htmlFor="receiverBusinessName"
        >
          <TextInput
            id="receiverBusinessName"
            name="receiverBusinessName"
            type="text"
            placeholder="e.g., Jane's Bookstore"
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
            placeholder="e.g., Jane"
            autoComplete="given-name"
            required
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
            placeholder="e.g., Smith"
            autoComplete="family-name"
            required
          />
        </FormField>

        <div className="grid grid-cols-1 gap-6 min-[360px]:grid-cols-2 min-[360px]:gap-4">
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
              required
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
              placeholder="0412 345 678"
              autoComplete="tel"
              required
            />
          </FormField>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="skipReceiverNotifications"
            className="mt-0.5 size-4 shrink-0 rounded border-ppg-border accent-ppg-orange"
          />
          <span className="text-sm leading-snug text-ppg-label">
            Don&apos;t send tracking notifications to the receiver
          </span>
        </label>

        <div className="flex justify-end pt-2">
          <ContinueButton type="submit" />
        </div>
      </form>
    </>
  )
}
