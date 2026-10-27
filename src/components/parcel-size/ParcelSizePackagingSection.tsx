import { BOOKING_SECTION_LABEL_CLASS } from '../layout/bookingStepStyles'
import { ParcelSizeCard } from './ParcelSizeCard'
import {
  CARRY_ON_PARCEL_SIZE_ID,
  PARCEL_SIZE_OPTIONS,
  showPackagingForParcelSize,
} from './parcelSizeOptions'

export function isParcelSizePackagingComplete(
  selectedSizeId: string | null,
  needsPackaging: boolean | null,
) {
  const showPackaging = showPackagingForParcelSize(selectedSizeId)
  return (
    selectedSizeId !== null &&
    (showPackaging ? needsPackaging !== null : true)
  )
}

type ParcelSizePackagingSectionProps = {
  selectedSizeId: string | null
  onSelectedSizeIdChange: (id: string) => void
  needsPackaging: boolean | null
  onNeedsPackagingChange: (value: boolean | null) => void
  /** When true, no top divider (first block under step heading) */
  firstOnPage?: boolean
}

export function ParcelSizePackagingSection({
  selectedSizeId,
  onSelectedSizeIdChange,
  needsPackaging,
  onNeedsPackagingChange,
  firstOnPage = false,
}: ParcelSizePackagingSectionProps) {
  const showPackaging = showPackagingForParcelSize(selectedSizeId)

  return (
    <section
      className={`flex flex-col gap-2 ${firstOnPage ? '' : 'border-t border-ppg-border pt-4'}`}
    >
      <h2 className={BOOKING_SECTION_LABEL_CLASS}>
        Parcel size <span className="text-red-500">*</span>
      </h2>
      <div
        data-testid="parcel-size-grid"
        className="flex w-full gap-1.5"
      >
        {PARCEL_SIZE_OPTIONS.map((option) => (
          <div key={option.id} className="min-w-0 flex-1 basis-0">
            <ParcelSizeCard
              compact
              option={option}
              selected={selectedSizeId === option.id}
              onSelect={() => {
                onSelectedSizeIdChange(option.id)
                if (option.id === CARRY_ON_PARCEL_SIZE_ID) {
                  onNeedsPackagingChange(null)
                }
              }}
              className="h-full w-full"
            />
          </div>
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
          <h2 className={BOOKING_SECTION_LABEL_CLASS}>
            Do you need packaging? <span className="text-red-500">*</span>{' '}
            <span className="font-normal text-ppg-label">(+$2.00)</span>
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onNeedsPackagingChange(true)}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                needsPackaging === true
                  ? 'border-2 border-ppg-orange bg-[#fff5f2] text-black'
                  : 'border border-ppg-border bg-white text-ppg-label'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onNeedsPackagingChange(false)}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                needsPackaging === false
                  ? 'border-2 border-ppg-orange bg-[#fff5f2] text-black'
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
  )
}
