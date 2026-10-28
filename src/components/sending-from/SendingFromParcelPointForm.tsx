import { useState } from 'react'
import type { CollectStore } from '../delivery-destination/collectStoreOptions'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import { SendingFromStepSection } from './SendingFromStepSection'

type SendingFromParcelPointFormProps = {
  nearestStore: CollectStore
  selectedStore: CollectStore
  onSelectedStoreChange: (store: CollectStore) => void
  sendingLocationOverride?: 'on' | 'off' | null
  onContinue: () => void
}

export function SendingFromParcelPointForm({
  nearestStore,
  selectedStore,
  onSelectedStoreChange,
  sendingLocationOverride = null,
  onContinue,
}: SendingFromParcelPointFormProps) {
  const [canContinue, setCanContinue] = useState(false)

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()
        if (!canContinue) return
        onContinue()
      }}
      footer={
        <FormStepFooter>
          <ContinueButton
            type="submit"
            label="Confirm"
            disabled={!canContinue}
            className="min-w-[140px]"
          />
        </FormStepFooter>
      }
    >
      <StepHeading compact step={1} title="Sending from this PARCELPOINT" />

      <SendingFromStepSection
        showHeading={false}
        nearestStore={nearestStore}
        selectedStore={selectedStore}
        onSelectedStoreChange={onSelectedStoreChange}
        onCompleteChange={setCanContinue}
        locationOverride={sendingLocationOverride}
      />
    </BookingStepShell>
  )
}
