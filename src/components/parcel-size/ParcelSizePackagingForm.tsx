import { useState } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { ParcelSizeCard } from './ParcelSizeCard'
import { PARCEL_SIZE_OPTIONS } from './parcelSizeOptions'

type ParcelSizePackagingFormProps = {
  onContinue: () => void
}

export function ParcelSizePackagingForm({
  onContinue,
}: ParcelSizePackagingFormProps) {
  const [selectedSizeId, setSelectedSizeId] = useState('handbag')
  const [needsPackaging, setNeedsPackaging] = useState(true)

  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <StepHeading step={1} title="Parcel Size & Packaging" />

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-normal text-ppg-label">
            What size best fits your parcel?
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {PARCEL_SIZE_OPTIONS.map((option) => (
              <ParcelSizeCard
                key={option.id}
                option={option}
                selected={selectedSizeId === option.id}
                onSelect={() => setSelectedSizeId(option.id)}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-normal text-ppg-label">
            Do you need packaging? (this store offers it)
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setNeedsPackaging(true)}
              className={`rounded-xl py-3.5 text-base font-semibold transition-colors ${
                needsPackaging
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
                !needsPackaging
                  ? 'bg-black text-white'
                  : 'border border-ppg-border bg-white text-ppg-label'
              }`}
            >
              No
            </button>
          </div>
          {needsPackaging ? (
            <p className="text-sm text-ppg-label">
              Adds a flat <strong className="font-semibold text-black">$3.00</strong>{' '}
              packaging fee to your total.
            </p>
          ) : null}
        </section>

        <div className="flex justify-end pt-2">
          <ContinueButton type="submit" />
        </div>
      </form>
    </>
  )
}
