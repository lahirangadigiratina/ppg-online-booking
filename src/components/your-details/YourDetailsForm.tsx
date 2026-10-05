import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { VerifiedMobileField } from '../form/VerifiedMobileField'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'

const MOCK_PHONE = '+61 447 317 773'

type YourDetailsFormProps = {
  onBack: () => void
  onContinue: () => void
}

export function YourDetailsForm({ onBack, onContinue }: YourDetailsFormProps) {
  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        noValidate
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <StepHeading step={2} title="Your Details" bracket="Sender" />

        <VerifiedMobileField phoneNumber={MOCK_PHONE} />

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

        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" />
        </FormStepFooter>
      </form>
    </>
  )
}
