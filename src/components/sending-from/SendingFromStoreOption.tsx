import { Check, Clock, MapPin } from 'lucide-react'
import type { CollectStore } from '../delivery-destination/collectStoreOptions'

type SendingFromStoreOptionProps = {
  store: CollectStore
  selected: boolean
  onSelect: () => void
}

export function SendingFromStoreOption({
  store,
  selected,
  onSelect,
}: SendingFromStoreOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full rounded-xl border p-3 text-left transition-colors ${
        selected
          ? 'border-ppg-orange bg-[#fff5f2] ring-1 ring-ppg-orange/30'
          : 'border-[#e8e8e8] bg-white hover:border-[#d0d0d0]'
      }`}
    >
      <div className="flex gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#f3f3f3]">
          <MapPin className="size-4 text-ppg-orange" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[13px] font-bold leading-snug text-black">
              {store.name}
            </p>
            {selected ? (
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-ppg-orange text-white">
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
            ) : (
              <p className="shrink-0 text-[13px] font-normal text-ppg-label">
                {store.distanceKm.toFixed(1)} km
              </p>
            )}
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-ppg-label">
            {store.address}
          </p>
          <p className="mt-1.5 flex min-w-0 items-center gap-1 text-[11px]">
            <span
              className={`shrink-0 font-bold ${store.open ? 'text-[#2e9e4f]' : 'text-ppg-label'}`}
            >
              {store.open ? 'OPEN' : 'CLOSED'}
            </span>
            <Clock className="size-3 shrink-0 text-ppg-label" strokeWidth={2} aria-hidden />
            <span className="truncate text-ppg-label">{store.hours}</span>
          </p>
        </div>
      </div>
    </button>
  )
}
