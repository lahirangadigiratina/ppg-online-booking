import { useMemo, useState } from 'react'
import { BookingStepShell } from '../layout/BookingStepShell'
import { BOOKING_HELP_TEXT_CLASS } from '../layout/bookingStepStyles'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import { ParcelSizePackagingSection } from './ParcelSizePackagingSection'

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

  const canContinue = useMemo(
    () => selectedSizeId != null && needsPackaging !== null,
    [needsPackaging, selectedSizeId],
  )

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()
        onContinue()
      }}
      footer={
        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" disabled={!canContinue} />
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
