import { CreditCard, Lock } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEventHandler, type ReactNode } from 'react'
import {
  hasRequiredText,
} from '../form/formValidation'

export const PAY_ONLINE_FORM_ID = 'pay-online-form'

const cardFieldClassName =
  'w-full border-0 bg-transparent px-3 py-2.5 text-sm text-black outline-none placeholder:text-[#b8b8b8] focus:ring-0'

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

type PayOnlineCardFormProps = {
  totalAmount?: string
  onSubmit: FormEventHandler<HTMLFormElement>
  onValidityChange?: (valid: boolean) => void
}

export function PayOnlineCardForm({
  totalAmount = '$17.66',
  onSubmit,
  onValidityChange,
}: PayOnlineCardFormProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')

  const isValid = useMemo(() => {
    const digits = cardNumber.replace(/\D/g, '')
    const cvc = cardCvc.replace(/\D/g, '')
    return (
      digits.length >= 15 &&
      hasRequiredText(cardExpiry) &&
      cvc.length >= 3 &&
      hasRequiredText(cardName)
    )
  }, [cardCvc, cardExpiry, cardName, cardNumber])

  useEffect(() => {
    onValidityChange?.(isValid)
  }, [isValid, onValidityChange])

  return (
    <div className="flex flex-col gap-2">
      <p className="text-left text-xs leading-snug text-ppg-label">
        Complete your secure card payment for {totalAmount}. You&apos;re all set
        once payment is confirmed — nothing else to do in-store.
      </p>

      <form
        id={PAY_ONLINE_FORM_ID}
        noValidate
        className="w-full rounded-xl border border-ppg-border bg-white p-3 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        onSubmit={onSubmit}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#999]">
          Payment
        </p>

        <label
          htmlFor="cardNumber"
          className="mt-2 block text-xs font-normal text-ppg-label"
        >
          Card information
        </label>
        <div className="mt-1 overflow-hidden rounded-lg border border-ppg-border bg-[#f7f7f7]">
          <div className="relative border-b border-ppg-border">
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
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
              value={cardExpiry}
              onChange={(event) => setCardExpiry(event.target.value)}
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
                value={cardCvc}
                onChange={(event) => setCardCvc(event.target.value)}
                className={`${cardFieldClassName} pr-9`}
              />
              <CreditCard
                className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-[#bbb]"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <label
          htmlFor="cardName"
          className="mt-3 block text-xs font-normal text-ppg-label"
        >
          Name on card
        </label>
        <input
          id="cardName"
          name="cardName"
          type="text"
          autoComplete="cc-name"
          value={cardName}
          onChange={(event) => setCardName(event.target.value)}
          className="mt-1 w-full rounded-lg border border-ppg-border bg-[#f7f7f7] px-3 py-2.5 text-sm text-black outline-none placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
        />

        <p className="mt-3 text-left text-[10px] leading-[1.35] text-ppg-label">
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
    </div>
  )
}
