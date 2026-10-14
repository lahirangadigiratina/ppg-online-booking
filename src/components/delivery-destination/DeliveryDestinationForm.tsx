import { useState } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import type { DoorBookingRoute } from '../../booking/bookingRoute'
import {
  DeliveryDestinationSection,
  type DeliveryMethod,
} from './DeliveryDestinationSection'

type DeliveryDestinationFormProps = {
  doorBookingRoute?: DoorBookingRoute
  onBack: () => void
  onContinue: () => void
}

export function DeliveryDestinationForm({
  doorBookingRoute = 'atl',
  onBack,
  onContinue,
}: DeliveryDestinationFormProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(
    null,
  )

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
        <StepHeading step={4} title="Where are you sending to?" />
        <DeliveryDestinationSection
          doorBookingRoute={doorBookingRoute}
          deliveryMethod={deliveryMethod}
          onDeliveryMethodChange={setDeliveryMethod}
        />

        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" />
        </FormStepFooter>
      </form>
    </>
  )
}
