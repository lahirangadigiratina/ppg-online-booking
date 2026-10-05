import {
  Bookmark,
  Clock,
  MapPin,
  Minus,
  Plus,
  Search,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  COLLECT_STORES,
  filterCollectStores,
  type CollectStore,
} from './collectStoreOptions'
import {
  CollectRadiusSelect,
  type CollectRadiusOption,
} from './CollectRadiusSelect'

const PHONE_SCREEN_ROOT_ID = 'phone-screen-root'
const PHONE_SCREEN_SCROLL_ID = 'phone-screen-scroll'

const MAP_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=151.248%2C-33.908%2C151.268%2C-33.892&layer=mapnik&marker=-33.900%2C151.258'

type CollectParcelPointModalProps = {
  open: boolean
  areaLabel?: string
  radius: CollectRadiusOption
  selectedStoreId?: string
  onRadiusChange: (value: CollectRadiusOption) => void
  onSelectStore: (store: CollectStore) => void
  onClose: () => void
}

function CollectStoreCard({
  store,
  selected,
  onSelect,
}: {
  store: CollectStore
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border bg-white p-3 text-left transition-colors ${
        selected
          ? 'border-ppg-orange ring-1 ring-ppg-orange/30'
          : 'border-[#e8e8e8] hover:border-[#d0d0d0]'
      }`}
    >
      <div className="flex gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#f3f3f3]">
          <MapPin className="size-4 text-[#e85caa]" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[13px] font-bold leading-snug text-black">
              {store.name}
            </p>
            <p className="shrink-0 text-[13px] font-normal text-ppg-label">
              {store.distanceKm.toFixed(1)} km
            </p>
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-ppg-label">
            {store.address}
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <p className="flex min-w-0 items-center gap-1 text-[11px]">
              <span
                className={`shrink-0 font-bold ${store.open ? 'text-[#2e9e4f]' : 'text-ppg-label'}`}
              >
                {store.open ? 'OPEN' : 'CLOSED'}
              </span>
              <Clock className="size-3 shrink-0 text-ppg-label" strokeWidth={2} aria-hidden />
              <span className="truncate text-ppg-label">{store.hours}</span>
            </p>
            <Bookmark
              className={`size-4 shrink-0 ${selected ? 'fill-ppg-orange text-ppg-orange' : 'text-[#c8c8c8]'}`}
              strokeWidth={2}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </button>
  )
}

export function CollectParcelPointModal({
  open,
  areaLabel = 'Bondi Junction 2022',
  radius,
  selectedStoreId,
  onRadiusChange,
  onSelectStore,
  onClose,
}: CollectParcelPointModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  const filteredStores = useMemo(
    () => filterCollectStores(COLLECT_STORES, searchQuery, radius),
    [searchQuery, radius],
  )

  useEffect(() => {
    setPortalRoot(document.getElementById(PHONE_SCREEN_ROOT_ID))
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const scrollEl = document.getElementById(PHONE_SCREEN_SCROLL_ID)
    const previousOverflow = scrollEl?.style.overflow ?? ''
    if (scrollEl) {
      scrollEl.scrollTop = 0
      scrollEl.style.overflow = 'hidden'
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (scrollEl) {
        scrollEl.style.overflow = previousOverflow
      }
    }
  }, [open, onClose])

  if (!open || !portalRoot) return null

  return createPortal(
    <div
      className="absolute inset-0 z-[100] flex h-full w-full items-center justify-center overflow-hidden bg-black/45 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="collect-modal-title"
        className="flex h-[78%] max-h-[520px] min-h-0 w-full flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="shrink-0 border-b border-ppg-border px-4 pb-2.5 pt-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 pr-1">
              <p className="text-[10px] font-bold uppercase tracking-wide text-ppg-label">
                Collect
              </p>
              <h2
                id="collect-modal-title"
                className="mt-0.5 text-[15px] font-bold leading-tight text-black"
              >
                Collect from PARCELPOINT
              </h2>
              <p className="mt-1.5 inline-flex max-w-full items-center gap-1 rounded-full border border-ppg-border bg-[#fafafa] px-2.5 py-0.5 text-xs text-black">
                <MapPin
                  className="size-3.5 shrink-0 text-ppg-orange"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="truncate">{areaLabel}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fdeaea] text-[#e53935] transition-colors hover:bg-[#fcd5d5]"
            >
              <X className="size-4" strokeWidth={2.5} aria-hidden />
            </button>
          </div>

          <div className="mt-2.5 flex gap-2">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ppg-label"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search stores..."
                className="w-full rounded-full border border-ppg-border bg-white py-2 pl-9 pr-3 text-sm text-black outline-none placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
              />
            </div>
            <CollectRadiusSelect
              compact
              value={radius}
              onChange={onRadiusChange}
            />
          </div>
        </header>

        <div className="relative h-[108px] shrink-0 border-b border-ppg-border bg-[#eef3f8]">
          <iframe
            title="Map of nearby PARCELPOINT locations"
            src={MAP_EMBED_URL}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1 rounded-full border border-ppg-border bg-white px-2 py-0.5 text-[10px] font-medium text-black shadow-sm">
            <span className="flex size-4 items-center justify-center rounded-full bg-ppg-orange text-[9px] font-bold text-white">
              {filteredStores.length}
            </span>
            on map
          </div>

          <div className="absolute bottom-2 right-2 flex flex-col overflow-hidden rounded-md border border-ppg-border bg-white shadow-sm">
            <button
              type="button"
              className="flex size-7 items-center justify-center border-b border-ppg-border text-black"
              aria-label="Zoom in"
            >
              <Plus className="size-3.5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="flex size-7 items-center justify-center text-black"
              aria-label="Zoom out"
            >
              <Minus className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col bg-white">
          <div className="shrink-0 px-4 py-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-ppg-label">
              Nearby stores
            </p>
            <p className="text-xs font-bold text-black">
              {filteredStores.length} available
            </p>
          </div>

          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4 [scrollbar-width:thin]">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <CollectStoreCard
                  key={store.id}
                  store={store}
                  selected={selectedStoreId === store.id}
                  onSelect={() => {
                    onSelectStore(store)
                    onClose()
                  }}
                />
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-ppg-border bg-[#fafafa] px-3 py-6 text-center text-xs text-ppg-label">
                No stores in this radius. Try increasing the distance.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    portalRoot,
  )
}
