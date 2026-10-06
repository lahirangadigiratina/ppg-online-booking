import { CreditCard, Lock } from 'lucide-react'
import type { ReactNode } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { BackButton } from '../ui/BackButton'

const TOTAL_AMOUNT = '$17.66'

const cardFieldClassName =
  'w-full border-0 bg-transparent px-3 py-3 text-base text-black outline-none placeholder:text-[#b8b8b8] focus:ring-0'

type PayOnlineScreenProps = {
  onBack: () => void
  onPaymentComplete: () => void
}

function CardBrandBadge({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex h-4 items-center rounded border border-[#e0e0e0] bg-white px-1 text-[7px] font-bold leading-none ${className}`}
    >
      {children}
    </span>
  )
}

export function PayOnlineScreen({
  onBack,
  onPaymentComplete,
}: PayOnlineScreenProps) {
  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <div className="flex flex-col items-center gap-5 text-center">
        <StepHeading step={9} title="Payment" />
        <p className="text-sm leading-snug text-ppg-label">
          Complete your secure card payment for {TOTAL_AMOUNT}. You&apos;re all
          set once payment is confirmed — nothing else to do in-store.
        </p>

        <form
          noValidate
          className="w-full rounded-2xl border border-ppg-border bg-white p-4 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          onSubmit={(event) => {
            event.preventDefault()
            onPaymentComplete()
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#999]">
            Payment
          </p>

          <label
            htmlFor="cardNumber"
            className="mt-4 block text-sm font-normal text-ppg-label"
          >
            Card information
          </label>
          <div className="mt-2 overflow-hidden rounded-lg border border-ppg-border bg-[#f7f7f7]">
            <div className="relative border-b border-ppg-border">
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 1234 1234 1234"
                className={`${cardFieldClassName} pr-[7.5rem]`}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-2 flex items-center gap-0.5"
                aria-hidden
              >
                <CardBrandBadge className="text-[#1a1f71]">VISA</CardBrandBadge>
                <CardBrandBadge className="text-[#eb001b]">MC</CardBrandBadge>
                <CardBrandBadge className="text-[#006fcf]">AMEX</CardBrandBadge>
                <CardBrandBadge className="text-[#0079be]">DC</CardBrandBadge>
              </div>
            </div>
            <div className="flex">
              <input
                id="cardExpiry"
                name="cardExpiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                className={`${cardFieldClassName} min-w-0 flex-1 border-r border-ppg-border`}
              />
              <div className="relative min-w-0 flex-1">
                <input
                  id="cardCvc"
                  name="cardCvc"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="CVC"
                  className={`${cardFieldClassName} pr-9`}
                />
                <CreditCard
                  className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-[#bbb]"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <label
            htmlFor="cardName"
            className="mt-4 block text-sm font-normal text-ppg-label"
          >
            Name on card
          </label>
          <input
            id="cardName"
            name="cardName"
            type="text"
            autoComplete="cc-name"
            className="mt-2 w-full rounded-lg border border-ppg-border bg-[#f7f7f7] px-3 py-3 text-base text-black outline-none placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
          />

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-ppg-orange py-3.5 text-base font-bold text-white transition-colors hover:bg-ppg-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
          >
            Pay
          </button>

          <p className="mx-auto mt-3 max-w-[18rem] text-center text-[10px] leading-[1.35] text-ppg-label">
            <Lock
              className="mr-0.5 inline size-3 align-text-bottom"
              strokeWidth={2}
              aria-hidden
            />
            Payments are securely processed by Airwallex.{' '}
            <button
              type="button"
              className="font-medium text-ppg-orange underline underline-offset-1"
              onClick={(event) => event.preventDefault()}
            >
              Airwallex Terms &amp; Policies
            </button>
            .
          </p>
        </form>

        <div className="flex w-full justify-start">
          <BackButton onClick={onBack} />
        </div>
      </div>
    </>
  )
}
