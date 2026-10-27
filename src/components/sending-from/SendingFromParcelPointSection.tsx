import { Clock, MapPin } from 'lucide-react'
import type { CollectStore } from '../delivery-destination/collectStoreOptions'
import { BOOKING_SECTION_LABEL_CLASS } from '../layout/bookingStepStyles'

type SendingFromParcelPointStoreCardProps = {
  store: CollectStore
  badge?: string
}

export function SendingFromParcelPointStoreCard({
  store,
  badge,
}: SendingFromParcelPointStoreCardProps) {
  return (
    <div
      className="rounded-xl border-2 border-ppg-orange bg-[#fff5f2] p-3"
      aria-label={`Sending from ${store.name}`}
    >
      {badge ? (
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-ppg-orange">
          {badge}
        </p>
      ) : null}
      <div className="flex gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white">
          <MapPin className="size-4 text-ppg-orange" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold leading-snug text-black">
            {store.name}
          </p>
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
    </div>
  )
}

type SendingFromParcelPointSectionProps = {
  store: CollectStore
}

export function SendingFromParcelPointSection({
  store,
}: SendingFromParcelPointSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className={BOOKING_SECTION_LABEL_CLASS}>
        Sending from this PARCELPOINT
      </h2>
      <SendingFromParcelPointStoreCard store={store} />
    </section>
  )
}
