import { Check, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { TermsAndConditionsModal } from '../legal/TermsAndConditionsModal'

const PHONE_SCREEN_ROOT_ID = 'phone-screen-root'
const PHONE_SCREEN_SCROLL_ID = 'phone-screen-scroll'

const KNOW_ITEMS = [
  'Protection is based on your declared parcel value.',
  'Proof of value and evidence of loss or damage are required for claims.',
  'Parcel Protection must be added before completing your booking.',
] as const

type ParcelProtectionModalProps = {
  open: boolean
  onClose: () => void
}

export function ParcelProtectionModal({
  open,
  onClose,
}: ParcelProtectionModalProps) {
  const [termsOpen, setTermsOpen] = useState(false)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setPortalRoot(document.getElementById(PHONE_SCREEN_ROOT_ID))
  }, [open])

  useEffect(() => {
    if (!open) setTermsOpen(false)
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !termsOpen) onClose()
    }

    const scrollEl = document.getElementById(PHONE_SCREEN_SCROLL_ID)
    const previousOverflow = scrollEl?.style.overflow ?? ''
    if (scrollEl) {
      scrollEl.style.overflow = 'hidden'
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (scrollEl) {
        scrollEl.style.overflow = previousOverflow
      }
    }
  }, [open, onClose, termsOpen])

  if (!open || !portalRoot) return null

  return createPortal(
    <>
      <div
        className="absolute inset-0 z-[100] flex items-end justify-center overflow-hidden bg-black/45 p-4 sm:items-center"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !termsOpen) onClose()
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="parcel-protection-title"
          className="max-h-[min(90%,640px)] w-full max-w-[390px] overflow-y-auto rounded-3xl bg-white px-6 pb-6 pt-7 shadow-[0_24px_48px_rgba(0,0,0,0.2)]"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="flex items-start gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#fff0e6]">
              <Shield
                className="size-6 text-ppg-orange"
                strokeWidth={1.75}
                aria-hidden
              />
            </span>
            <div className="min-w-0 pt-0.5">
              <h2
                id="parcel-protection-title"
                className="text-xl font-bold leading-snug text-black"
              >
                Parcel Protection
              </h2>
              <p className="mt-1 text-sm leading-snug text-ppg-label">
                Protect your parcel against loss or damage during delivery.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ppg-label">
            Parcel Protection provides cover based on the declared value of your
            goods.
          </p>

          <section className="mt-5 rounded-2xl bg-[#f5f5f5] px-4 py-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wide text-[#888]">
              What you need to know
            </h3>
            <ul className="mt-3 space-y-3">
              {KNOW_ITEMS.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-snug text-black">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-ppg-orange"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-5 text-sm text-ppg-label">
            Terms, claim timeframes and exclusions apply.
          </p>
          <p className="mt-1 text-sm text-ppg-label">
            View{' '}
            <button
              type="button"
              className="font-medium text-ppg-orange underline underline-offset-2"
              onClick={() => setTermsOpen(true)}
            >
              Terms &amp; Conditions
            </button>
            .
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-full bg-ppg-orange py-3.5 text-base font-bold text-white transition-colors hover:bg-ppg-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
          >
            Got it
          </button>
        </div>
      </div>

      <TermsAndConditionsModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
      />
    </>,
    portalRoot,
  )
}
