import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import { AddOnsSection } from './AddOnsSection'

type AddOnsFormProps = {
  onBack: () => void
  onContinue: () => void
}

export function AddOnsForm({ onBack, onContinue }: AddOnsFormProps) {
  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        noValidate
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <StepHeading step={5} title="Add-ons" />

        <AddOnsSection parcelValueInput="50" />

        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" />
        </FormStepFooter>
      </form>
    </>
  )
}
