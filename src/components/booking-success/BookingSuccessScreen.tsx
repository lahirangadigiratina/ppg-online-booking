import { ArrowRight, Check, Copy, Download, MapPin, Share2 } from 'lucide-react'
import { useState } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'

const TOTAL_AMOUNT = '$17.66'
const BOOKING_REF = 'PPG-48213'
const TRACKING_NUMBER = 'MP8031920017'

const actionButtonClassName =
  'inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-ppg-border bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange'

export function BookingSuccessScreen() {
  const [trackingCopied, setTrackingCopied] = useState(false)
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)

  function downloadLabel() {
    const lines = [
      'PARCELPOINT Go — Shipping label',
      '',
      `Booking ref: ${BOOKING_REF}`,
      `Tracking: ${TRACKING_NUMBER}`,
      'From: Kavanaghs Pharmacy',
      'To: 15/37 Nicholson St, Balmain East',
      'Contents: Handbag · 1kg',
      '',
      'Present this label when dropping off your parcel.',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `parcelpoint-label-${BOOKING_REF}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function shareBooking() {
    const text = `PARCELPOINT Go booking ${BOOKING_REF} — track ${TRACKING_NUMBER}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'PARCELPOINT Go booking',
          text,
        })
        return
      }
      await navigator.clipboard.writeText(text)
      setShareFeedback('Copied')
      window.setTimeout(() => setShareFeedback(null), 2000)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setShareFeedback(null)
    }
  }

  async function copyTracking() {
    try {
      await navigator.clipboard.writeText(TRACKING_NUMBER)
      setTrackingCopied(true)
      window.setTimeout(() => setTrackingCopied(false), 2000)
    } catch {
      setTrackingCopied(false)
    }
  }
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
              <dd className="font-bold text-black">{BOOKING_REF}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ppg-label">Tracking</dt>
              <dd className="flex items-center justify-end gap-1 font-bold text-black">
                <span>{TRACKING_NUMBER}</span>
                <button
                  type="button"
                  onClick={() => void copyTracking()}
                  aria-label={
                    trackingCopied ? 'Tracking number copied' : 'Copy tracking number'
                  }
                  className="flex size-5 shrink-0 items-center justify-center rounded border border-ppg-border text-ppg-label transition-colors hover:border-ppg-orange/40 hover:bg-[#fff8f3] hover:text-ppg-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
                >
                  {trackingCopied ? (
                    <Check className="size-2.5 text-[#2e9e4f]" strokeWidth={2.75} aria-hidden />
                  ) : (
                    <Copy className="size-2.5" strokeWidth={2.25} aria-hidden />
                  )}
                </button>
              </dd>
            </div>
          </dl>
        </article>

        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={downloadLabel}
            className={actionButtonClassName}
          >
            <Download className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            Download label
          </button>
          <button
            type="button"
            onClick={() => void shareBooking()}
            className={actionButtonClassName}
          >
            {shareFeedback === 'Copied' ? (
              <Check className="size-4 shrink-0 text-[#2e9e4f]" strokeWidth={2.5} aria-hidden />
            ) : (
              <Share2 className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            )}
            {shareFeedback ?? 'Share'}
          </button>
        </div>
      </div>
    </>
  )
}
