import { useEffect, useMemo, useState } from 'react'
import {
  COLLECT_STORES,
  type CollectStore,
} from '../delivery-destination/collectStoreOptions'
import { FormField } from '../form/FormField'
import { BOOKING_HELP_TEXT_CLASS, BOOKING_SECTION_LABEL_CLASS } from '../layout/bookingStepStyles'
import { SendingFromParcelPointStoreCard } from './SendingFromParcelPointSection'
import { SendingFromStoreOption } from './SendingFromStoreOption'
import { SuburbSearchSelect } from './SuburbSearchSelect'
import type { SuburbOption } from './suburbOptions'
import { useSendingLocation } from './useSendingLocation'

type SendingFromStepSectionProps = {
  nearestStore: CollectStore
  selectedStore: CollectStore
  onSelectedStoreChange: (store: CollectStore) => void
  onCompleteChange: (complete: boolean) => void
  locationOverride?: 'on' | 'off' | null
  showHeading?: boolean
}

function filterStoresBySuburb(suburb: SuburbOption): CollectStore[] {
  return [...COLLECT_STORES]
    .filter((store) => store.address.includes(suburb.addressPart))
    .sort((a, b) => a.distanceKm - b.distanceKm)
}

export function SendingFromStepSection({
  nearestStore,
  selectedStore,
  onSelectedStoreChange,
  onCompleteChange,
  locationOverride = null,
  showHeading = true,
}: SendingFromStepSectionProps) {
  const { status, detectedStore } = useSendingLocation({
    nearestStore,
    override: locationOverride,
  })
  const [selectedSuburb, setSelectedSuburb] = useState<SuburbOption | null>(null)

  const suburbStores = useMemo(
    () => (selectedSuburb ? filterStoresBySuburb(selectedSuburb) : []),
    [selectedSuburb],
  )

  useEffect(() => {
    if (status === 'on') {
      onSelectedStoreChange(detectedStore)
      onCompleteChange(true)
      return
    }
    if (status === 'checking') {
      onCompleteChange(false)
      return
    }
    if (!selectedSuburb) {
      onCompleteChange(false)
      return
    }
    const storeInSuburb = suburbStores.some((s) => s.id === selectedStore.id)
    onCompleteChange(storeInSuburb)
  }, [
    detectedStore,
    onCompleteChange,
    onSelectedStoreChange,
    selectedStore.id,
    selectedSuburb,
    status,
    suburbStores,
  ])

  useEffect(() => {
    if (status !== 'off' || !selectedSuburb) return
    if (suburbStores.length === 0) return
    if (!suburbStores.some((s) => s.id === selectedStore.id)) {
      onSelectedStoreChange(suburbStores[0])
    }
  }, [
    onSelectedStoreChange,
    selectedStore.id,
    selectedSuburb,
    status,
    suburbStores,
  ])

  return (
    <section className="flex flex-col gap-2.5">
      {showHeading ? (
        <h2 className={BOOKING_SECTION_LABEL_CLASS}>
          Sending from this PARCELPOINT
        </h2>
      ) : null}

      {status === 'checking' ? (
        <p className={BOOKING_HELP_TEXT_CLASS}>Finding your location…</p>
      ) : null}

      {status === 'on' ? (
        <>
          <p className={BOOKING_HELP_TEXT_CLASS}>
            You&apos;re at this location — no need to choose another store.
          </p>
          <SendingFromParcelPointStoreCard store={detectedStore} badge="Near you" />
        </>
      ) : null}

      {status === 'off' ? (
        <>
          <p className={BOOKING_HELP_TEXT_CLASS}>
            Which suburb are you in? We&apos;ll show PARCELPOINT drop-off points
            nearby — you don&apos;t need the street address.
          </p>
          <FormField
            label={
              <>
                Suburb <span className="text-red-500">*</span>
              </>
            }
            htmlFor="sendingSuburb"
          >
            <SuburbSearchSelect
              id="sendingSuburb"
              onSelectedChange={setSelectedSuburb}
            />
          </FormField>

          {selectedSuburb && suburbStores.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-black">
                Choose a drop-off point in {selectedSuburb.label}
              </p>
              {suburbStores.map((store) => (
                <SendingFromStoreOption
                  key={store.id}
                  store={store}
                  selected={store.id === selectedStore.id}
                  onSelect={() => onSelectedStoreChange(store)}
                />
              ))}
            </div>
          ) : null}

          {selectedSuburb && suburbStores.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ppg-border bg-[#fafafa] px-3 py-4 text-center text-xs text-ppg-label">
              No PARCELPOINT locations in this suburb yet. Try another suburb.
            </p>
          ) : null}
        </>
      ) : null}

      <input type="hidden" name="sendingFromStoreId" value={selectedStore.id} />
      <input type="hidden" name="sendingLocationStatus" value={status} />
    </section>
  )
}
