import { useState } from 'react'
import { BookingStepShell } from '../layout/BookingStepShell'
import { BOOKING_HELP_TEXT_CLASS } from '../layout/bookingStepStyles'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import {
  isParcelSizePackagingComplete,
  ParcelSizePackagingSection,
} from './ParcelSizePackagingSection'

type ParcelSizePackagingFormProps = {
  onBack: () => void
  onContinue: () => void
}

export function ParcelSizePackagingForm({
  onBack,
  onContinue,
}: ParcelSizePackagingFormProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [needsPackaging, setNeedsPackaging] = useState<boolean | null>(null)

  const canContinue = isParcelSizePackagingComplete(
    selectedSizeId,
    needsPackaging,
  )

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()
        if (!canContinue) return
        onContinue()
      }}
      footer={
        <FormStepFooter onBack={onBack}>
          <ContinueButton
            type="submit"
            disabled={!canContinue}
            className={
              canContinue
                ? undefined
                : 'cursor-not-allowed opacity-50 hover:bg-ppg-orange'
            }
          />
        </FormStepFooter>
      }
    >
      <StepHeading compact step={2} title="Parcel Size & Packaging" />

      <p className={BOOKING_HELP_TEXT_CLASS}>
        Select your parcel size and whether you need packaging at the store.
      </p>

      <ParcelSizePackagingSection
        selectedSizeId={selectedSizeId}
        onSelectedSizeIdChange={setSelectedSizeId}
        needsPackaging={needsPackaging}
        onNeedsPackagingChange={setNeedsPackaging}
      />
    </BookingStepShell>
  )
}
