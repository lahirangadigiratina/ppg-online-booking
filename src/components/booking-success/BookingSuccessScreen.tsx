import { Check } from 'lucide-react'
import { BookingStepShell } from '../layout/BookingStepShell'
import { AgentBarcode } from './AgentBarcode'

const TOTAL_AMOUNT = '$17.66'
const BOOKING_REF = 'PHAAADU17'
const SHIPMENT_ORIGIN = 'Bondi Beach'
const SHIPMENT_DESTINATION = '25 Spring St'

export type BookingSuccessVariant = 'cash' | 'card'

type BookingSuccessScreenProps = {
  variant: BookingSuccessVariant
}

export function BookingSuccessScreen({ variant }: BookingSuccessScreenProps) {
  const payAtAgent = variant === 'cash'

  return (
    <BookingStepShell>
      <div className="flex flex-col items-center gap-4 pb-2 text-center">
        <div className="relative flex size-20 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full bg-[#e8f8ee]"
            aria-hidden
          />
          <span className="relative flex size-14 items-center justify-center rounded-full bg-[#2e9e4f] text-white">
            <Check className="size-8" strokeWidth={3} aria-hidden />
          </span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-black">All Booked!</h1>
          <p className="mt-1.5 text-xs leading-snug text-ppg-label">
            {payAtAgent
              ? 'Your booking is confirmed. Pay at the store when you drop off your parcel.'
              : "You're all set! We've emailed your shipment details and digital receipt."}
          </p>
          <p className="mt-2 text-sm font-bold text-black">
            1 shipment confirmed · {TOTAL_AMOUNT}
          </p>
        </div>

        {payAtAgent ? (
          <p
            className="w-full rounded-2xl border-2 border-ppg-orange bg-[#fff5f2] px-4 py-3 text-base font-bold leading-snug text-black"
            role="status"
          >
            Please pay {TOTAL_AMOUNT} to the agent.
          </p>
        ) : null}

        <article className="w-full rounded-2xl border border-ppg-border bg-white p-4 text-left">
          <div className="flex gap-3">
            <span className="text-2xl leading-none" aria-hidden>
              📦
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 space-y-1.5 text-sm">
                  <p className="font-bold leading-snug text-black">
                    {SHIPMENT_ORIGIN}
                    <span aria-hidden className="mx-1.5 font-normal">
                      →
                    </span>
                    {SHIPMENT_DESTINATION}
                  </p>
                  <p className="text-xs text-ppg-label">Handbag · 1kg</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-base font-bold text-black">{TOTAL_AMOUNT}</p>
                  <p className="text-xs text-ppg-label">incl. GST</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4 border-0 border-t border-ppg-border" />

          <dl className="text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="shrink-0 text-ppg-label">Booking Ref</dt>
              <dd className="font-bold tabular-nums text-black">{BOOKING_REF}</dd>
            </div>
          </dl>
        </article>

        <section className="flex w-full flex-col items-center rounded-2xl border border-ppg-border bg-white px-4 py-5 text-center">
          <AgentBarcode value={BOOKING_REF} />
          <p className="mt-3 w-full font-mono text-sm font-semibold tracking-wide text-black">
            {BOOKING_REF}
          </p>
          <p className="mt-4 text-base font-bold text-black">
            Show this to the agent
          </p>
          <p className="mt-1 text-sm leading-snug text-ppg-label">
            They&apos;ll scan this barcode when you drop off your parcel at the
            store.
          </p>
        </section>
      </div>
    </BookingStepShell>
  )
}
