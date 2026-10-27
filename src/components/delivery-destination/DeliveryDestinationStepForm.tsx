import { useState } from 'react'
import type { DoorBookingRoute } from '../../booking/bookingRoute'
import {
  isParcelSizePackagingComplete,
  ParcelSizePackagingSection,
} from '../parcel-size/ParcelSizePackagingSection'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import {
  DeliveryDestinationSection,
  type DeliveryMethod,
} from './DeliveryDestinationSection'

type DeliveryDestinationStepFormProps = {
  doorBookingRoute: DoorBookingRoute
  deliveryMethod: DeliveryMethod | null
  onDeliveryMethodChange: (method: DeliveryMethod) => void
  onBack: () => void
  onContinue: () => void
}

export function DeliveryDestinationStepForm({
  doorBookingRoute,
  deliveryMethod,
  onDeliveryMethodChange,
  onBack,
  onContinue,
}: DeliveryDestinationStepFormProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [needsPackaging, setNeedsPackaging] = useState<boolean | null>(null)

  const parcelComplete = isParcelSizePackagingComplete(
    selectedSizeId,
    needsPackaging,
  )
  const canContinue = deliveryMethod !== null && parcelComplete

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
      <StepHeading compact step={2} title="Delivery & Parcel Size" />

      <ParcelSizePackagingSection
        firstOnPage
        selectedSizeId={selectedSizeId}
        onSelectedSizeIdChange={setSelectedSizeId}
        needsPackaging={needsPackaging}
        onNeedsPackagingChange={setNeedsPackaging}
      />

      <div className="flex flex-col gap-2 border-t border-ppg-border pt-4">
        <DeliveryDestinationSection
          doorBookingRoute={doorBookingRoute}
          deliveryMethod={deliveryMethod}
          onDeliveryMethodChange={onDeliveryMethodChange}
        />
      </div>
    </BookingStepShell>
  )
}
