import { useMemo, useState } from 'react'
import type { CollectRadiusOption } from '../delivery-destination/CollectRadiusSelect'
import { BookingSearchField } from '../form/BookingSearchField'
import type { CollectStore } from '../delivery-destination/collectStoreOptions'
import { filterSendingParcelPointStores } from '../delivery-destination/collectStoreOptions'
import { SendingFromParcelPointMapModal } from './SendingFromParcelPointMapModal'
import { BookingStepShell } from '../layout/BookingStepShell'
import { BOOKING_SECTION_LABEL_CLASS } from '../layout/bookingStepStyles'
import { ContinueButton } from '../ui/ContinueButton'
import { SendingFromParcelPointStoreCard } from './SendingFromParcelPointSection'
import { SendingFromStoreOption } from './SendingFromStoreOption'

type SendingFromParcelPointFormProps = {
  initialStore: CollectStore
  selectedStore: CollectStore
  onSelectedStoreChange: (store: CollectStore) => void
  onContinue: () => void
}

export function SendingFromParcelPointForm({
  initialStore,
  selectedStore,
  onSelectedStoreChange,
  onContinue,
}: SendingFromParcelPointFormProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [mapOpen, setMapOpen] = useState(false)
  const [mapRadius, setMapRadius] = useState<CollectRadiusOption>('2 km')

  const filteredStores = useMemo(
    () => filterSendingParcelPointStores(searchQuery),
    [searchQuery],
  )

  const suggestedBadge =
    selectedStore.id === initialStore.id ? 'Suggested location' : undefined

  return (
    <BookingStepShell
      scrollableBody={false}
      onSubmit={(event) => {
        event.preventDefault()
        onContinue()
      }}
      footer={
        <div className="flex justify-end">
          <ContinueButton
            type="submit"
            label="Confirm"
            className="min-w-[140px]"
          />
        </div>
      }
    >
      <div className="sending-from-step-layout flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden">
        <div className="flex shrink-0 flex-col gap-2.5 bg-white">
          <h1 className="text-lg font-bold leading-snug tracking-tight text-black">
            Sending from this PARCELPOINT
          </h1>

          <SendingFromParcelPointStoreCard
            store={selectedStore}
            badge={suggestedBadge}
          />

          <BookingSearchField
            showMapButton
            onMapClick={() => setMapOpen(true)}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search PARCELPOINT locations..."
            autoComplete="off"
          />

          <SendingFromParcelPointMapModal
            open={mapOpen}
            radius={mapRadius}
            onRadiusChange={setMapRadius}
            selectedStoreId={selectedStore.id}
            onSelectStore={onSelectedStoreChange}
            onClose={() => setMapOpen(false)}
          />

          <h2 className={BOOKING_SECTION_LABEL_CLASS}>
            {searchQuery.trim() ? 'Search results' : 'Nearby locations'}
          </h2>
        </div>

        <div className="ppg-scroll sending-from-step-list min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5">
          {filteredStores.length > 0 ? (
            <div className="flex flex-col gap-2 pb-1">
              {filteredStores.map((store) => (
                <SendingFromStoreOption
                  key={store.id}
                  store={store}
                  selected={store.id === selectedStore.id}
                  onSelect={() => onSelectedStoreChange(store)}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-ppg-border bg-[#fafafa] px-3 py-5 text-center text-xs text-ppg-label">
              No locations match your search. Try a different name or suburb.
            </p>
          )}
        </div>
        <input type="hidden" name="sendingFromStoreId" value={selectedStore.id} />
      </div>
    </BookingStepShell>
  )
}
