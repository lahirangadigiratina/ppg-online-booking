import { ArrowRight, Check, MapPin } from 'lucide-react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'

const TOTAL_AMOUNT = '$17.66'

export function BookingSuccessScreen() {
  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <div className="flex flex-col items-center gap-5 pb-2 text-center">
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
          <h1 className="text-2xl font-bold text-black">All Booked!</h1>
          <p className="mt-2 text-sm leading-snug text-ppg-label">
            You&apos;re all set! We&apos;ve emailed your shipment details.
          </p>
          <p className="mt-3 text-base font-bold text-black">
            1 shipment confirmed · {TOTAL_AMOUNT}
          </p>
        </div>

        <article className="w-full rounded-2xl border border-ppg-border bg-white p-4 text-left">
          <div className="flex gap-3">
            <span className="text-2xl leading-none" aria-hidden>
              📦
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 space-y-1.5 text-sm">
                  <p className="flex items-center gap-1.5 font-semibold text-black">
                    <MapPin
                      className="size-4 shrink-0 text-ppg-orange"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="truncate">Kavanaghs Pharmacy</span>
                  </p>
                  <p className="flex items-center gap-1.5 pl-0.5 text-ppg-label">
                    <ArrowRight className="size-3.5 shrink-0" aria-hidden />
                  </p>
                  <p className="flex items-start gap-1.5 font-semibold text-black">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-ppg-orange"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>15/37 Nicholson St, Balmain East</span>
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

          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ppg-label">Booking Ref</dt>
              <dd className="font-bold text-black">PPG-48213</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ppg-label">Tracking</dt>
              <dd className="font-bold text-black">MP8031920017</dd>
            </div>
          </dl>
        </article>
      </div>
    </>
  )
}
