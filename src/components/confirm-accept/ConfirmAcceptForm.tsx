import { AlertTriangle, Check, Timer } from 'lucide-react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'

type ConfirmAcceptFormProps = {
  onContinueToPayment: () => void
}

const PRICE_LINES = [
  { label: 'Delivery', amount: '$10.85' },
  { label: 'Packaging Fee', amount: '$3.00' },
  { label: 'Signature on Delivery', amount: '$2.20' },
  { label: 'GST (10%)', amount: '$1.61' },
] as const

export function ConfirmAcceptForm({ onContinueToPayment }: ConfirmAcceptFormProps) {
  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <div className="flex flex-col gap-4">
        <StepHeading step={7} title="Confirm & Accept" />

        <section className="rounded-2xl border border-ppg-border bg-white p-4">
          <div className="flex gap-3 border-b border-ppg-border pb-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ppg-orange text-white">
              <Check className="size-4" strokeWidth={3} aria-hidden />
            </span>
            <p className="text-sm leading-snug text-black">
              I agree to the{' '}
              <a
                href="#terms"
                className="font-medium text-ppg-orange underline underline-offset-2"
                onClick={(event) => event.preventDefault()}
              >
                Terms &amp; Conditions
              </a>{' '}
              and{' '}
              <a
                href="#privacy"
                className="font-medium text-ppg-orange underline underline-offset-2"
                onClick={(event) => event.preventDefault()}
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e8b923] text-white">
              <AlertTriangle className="size-4" strokeWidth={2.5} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-black">No dangerous goods</p>
              <p className="mt-1 text-sm leading-snug text-ppg-label">
                I confirm this parcel does not contain prohibited or dangerous
                goods.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ppg-border bg-white p-4">
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ppg-border bg-white">
              <Timer className="size-4 text-ppg-label" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <p className="text-base font-bold text-black">Price Summary</p>
              <p className="mt-0.5 text-sm text-ppg-label">
                See how it all adds up — each charge is listed below.
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2.5">
            {PRICE_LINES.map((line) => (
              <li
                key={line.label}
                className="flex items-center justify-between gap-3 text-sm text-black"
              >
                <span>{line.label}</span>
                <span className="font-semibold">{line.amount}</span>
              </li>
            ))}
          </ul>

          <hr className="my-4 border-0 border-t border-ppg-border" />

          <div className="flex items-center justify-between gap-3">
            <span className="text-lg font-bold text-black">Total</span>
            <span className="text-lg font-bold text-black">$17.66</span>
          </div>
        </section>

        <button
          type="button"
          onClick={onContinueToPayment}
          className="mt-1 w-full rounded-full bg-ppg-orange py-3.5 text-base font-bold text-white transition-colors hover:bg-ppg-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
        >
          Continue to Payment
        </button>
      </div>
    </>
  )
}
