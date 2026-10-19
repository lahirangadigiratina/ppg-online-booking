import { useState } from 'react'
import type { DoorBookingRoute } from '../../booking/bookingRoute'
import {
  DeliveryDestinationSection,
  type DeliveryMethod,
} from '../delivery-destination/DeliveryDestinationSection'
import { BookingStepShell } from '../layout/BookingStepShell'
import { BOOKING_SECTION_LABEL_CLASS } from '../layout/bookingStepStyles'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { ParcelSizeCard } from './ParcelSizeCard'
import {
  CARRY_ON_PARCEL_SIZE_ID,
  PARCEL_SIZE_OPTIONS,
  showPackagingForParcelSize,
} from './parcelSizeOptions'

type ParcelSizePackagingFormProps = {
  doorBookingRoute: DoorBookingRoute
  onContinue: () => void
}

export function ParcelSizePackagingForm({
  doorBookingRoute,
  onContinue,
}: ParcelSizePackagingFormProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [needsPackaging, setNeedsPackaging] = useState<boolean | null>(null)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(
    null,
  )

  const showPackaging = showPackagingForParcelSize(selectedSizeId)
  const canContinue =
    selectedSizeId !== null &&
    (showPackaging ? needsPackaging !== null : true) &&
    deliveryMethod !== null

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()
        if (!canContinue) return
        onContinue()
      }}
      footer={
        <div className="flex justify-end">
          <ContinueButton
            type="submit"
            disabled={!canContinue}
            className={
              canContinue
                ? 'min-w-[140px]'
                : 'min-w-[140px] cursor-not-allowed opacity-50 hover:bg-ppg-orange'
            }
          />
        </div>
      }
    >
      <StepHeading compact step={1} title="Parcel Size & Packaging" />

      <p className={BOOKING_SECTION_LABEL_CLASS}>
        Select parcel size and packaging, then enter the receiver’s address and
        select the receiving method.
      </p>

      <section className="flex flex-col gap-2">
        <h2 className={BOOKING_SECTION_LABEL_CLASS}>
          Parcel size <span className="text-red-500">*</span>
        </h2>
        <div
          data-testid="parcel-size-grid"
          className="grid grid-cols-4 gap-1.5"
        >
          {PARCEL_SIZE_OPTIONS.map((option) => (
            <ParcelSizeCard
              key={option.id}
              option={option}
              compact
              selected={selectedSizeId === option.id}
              onSelect={() => {
                setSelectedSizeId(option.id)
                if (option.id === CARRY_ON_PARCEL_SIZE_ID) {
                  setNeedsPackaging(null)
                }
              }}
              className="min-w-0 w-full"
            />
          ))}
        </div>
        <input
          type="hidden"
          name="parcelSize"
          value={selectedSizeId ?? ''}
          required
        />

        {showPackaging ? (
          <div className="flex flex-col gap-2 border-t border-ppg-border pt-2">
            <p className="text-[11px] leading-snug text-ppg-label">
              Do you need packaging? <span className="text-red-500">*</span>{' '}
              <span className="text-[#999]">(+$2.00)</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNeedsPackaging(true)}
                className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                  needsPackaging === true
                    ? 'bg-black text-white'
                    : 'border border-ppg-border bg-white text-ppg-label'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setNeedsPackaging(false)}
                className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                  needsPackaging === false
                    ? 'bg-black text-white'
                    : 'border border-ppg-border bg-white text-ppg-label'
                }`}
              >
                No
              </button>
            </div>
            <input
              type="hidden"
              name="needsPackaging"
              value={
                needsPackaging === null ? '' : needsPackaging ? 'yes' : 'no'
              }
              required
            />
          </div>
        ) : selectedSizeId === CARRY_ON_PARCEL_SIZE_ID ? (
          <input type="hidden" name="needsPackaging" value="no" />
        ) : null}
      </section>

      <DeliveryDestinationSection
        doorBookingRoute={doorBookingRoute}
        deliveryMethod={deliveryMethod}
        onDeliveryMethodChange={setDeliveryMethod}
      />
    </BookingStepShell>
  )
}
