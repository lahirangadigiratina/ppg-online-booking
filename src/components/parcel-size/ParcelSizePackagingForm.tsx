import { useState } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import type { DoorBookingRoute } from '../../booking/bookingRoute'
import {
  DeliveryDestinationSection,
  type DeliveryMethod,
} from '../delivery-destination/DeliveryDestinationSection'
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
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        noValidate
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          if (!canContinue) return
          onContinue()
        }}
      >
        <StepHeading step={1} title="Parcel Size & Packaging" />

        <p className="text-sm font-normal text-ppg-label">
          Select parcel size and packaging, then enter the receiver’s address
          and select the receiving method.
        </p>

        <section className="flex flex-col gap-3 rounded-2xl border border-ppg-border bg-white p-4">
          <h2 className="text-sm font-normal text-ppg-label">
            Parcel size <span className="text-red-500">*</span>
          </h2>
          <div
            data-testid="parcel-size-grid"
            className="grid grid-cols-2 gap-3"
          >
            {PARCEL_SIZE_OPTIONS.map((option) => (
              <ParcelSizeCard
                key={option.id}
                option={option}
                selected={selectedSizeId === option.id}
                onSelect={() => {
                  setSelectedSizeId(option.id)
                  if (option.id === CARRY_ON_PARCEL_SIZE_ID) {
                    setNeedsPackaging(null)
                  }
                }}
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
            <div className="flex flex-col gap-3 border-t border-ppg-border pt-4">
              <h2 className="text-sm font-normal leading-snug text-ppg-label">
                <span className="block">
                  Do you need packaging?{' '}
                  <span className="text-red-500">*</span>
                </span>
                <span className="mt-1 block">
                  (Adds a flat{' '}
                  <strong className="font-semibold text-black">$2.00</strong>{' '}
                  packaging fee to your total)
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNeedsPackaging(true)}
                  className={`rounded-xl py-3.5 text-base font-semibold transition-colors ${
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
                  className={`rounded-xl py-3.5 text-base font-semibold transition-colors ${
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

        <div className="flex justify-end pt-2">
          <ContinueButton
            type="submit"
            disabled={!canContinue}
            className={
              canContinue
                ? ''
                : 'cursor-not-allowed opacity-50 hover:bg-ppg-orange'
            }
          />
        </div>
      </form>
    </>
  )
}
