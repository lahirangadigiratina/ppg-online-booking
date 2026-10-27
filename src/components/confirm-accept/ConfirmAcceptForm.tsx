import { Check } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { PrivacyPolicyModal } from '../legal/PrivacyPolicyModal'
import { TermsAndConditionsModal } from '../legal/TermsAndConditionsModal'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'

type ConfirmCheckboxProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
  children: ReactNode
}

function ConfirmCheckbox({
  checked,
  onCheckedChange,
  label,
  children,
}: ConfirmCheckboxProps) {
  return (
    <div className="flex items-start gap-2.5">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onCheckedChange(!checked)}
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full transition-colors ${
          checked
            ? 'bg-ppg-orange text-white'
            : 'border-2 border-[#d8d8d8] bg-white'
        }`}
      >
        {checked ? (
          <Check className="size-3" strokeWidth={3} aria-hidden />
        ) : null}
      </button>
      <div className="min-w-0 flex-1 text-xs leading-snug text-black">
        {children}
      </div>
    </div>
  )
}

type ConfirmAcceptFormProps = {
  onBack: () => void
  onContinueToPayment: () => void
}

const PRICE_LINES = [
  { label: 'Delivery', amount: '$12.35' },
  { label: 'Packaging Fee', amount: '$3.00' },
  { label: 'Signature on Delivery', amount: '$2.20' },
  { label: 'GST (10%)', amount: '$1.76' },
] as const

const CONFIRM_TOTAL_AMOUNT = 19.31

/** Demo codes for prototype; replace with API validation when wired. */
const COUPON_DISCOUNTS: Record<string, number> = {
  PARCEL10: 2,
  SAVE5: 5,
}

function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`
}

export function ConfirmAcceptForm({
  onBack,
  onContinueToPayment,
}: ConfirmAcceptFormProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [noDangerousGoods, setNoDangerousGoods] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
  } | null>(null)
  const [couponError, setCouponError] = useState<string | null>(null)

  const totalAmount = useMemo(() => {
    const discount = appliedCoupon?.discount ?? 0
    return Math.max(0, CONFIRM_TOTAL_AMOUNT - discount)
  }, [appliedCoupon])

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase()
    if (!code) {
      setCouponError('Enter a coupon code.')
      setAppliedCoupon(null)
      return
    }
    const discount = COUPON_DISCOUNTS[code]
    if (discount == null) {
      setCouponError('This coupon code is not valid.')
      setAppliedCoupon(null)
      return
    }
    setAppliedCoupon({ code, discount })
    setCouponError(null)
  }

  function removeCoupon() {
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponError(null)
  }

  return (
    <BookingStepShell
      footer={
        <FormStepFooter onBack={onBack}>
          <ContinueButton type="button" onClick={onContinueToPayment}>
            Make Payment
          </ContinueButton>
        </FormStepFooter>
      }
    >
      <StepHeading compact step={6} title="Confirm & Accept" />

      <section className="rounded-xl border border-ppg-border bg-white p-3">
        <ConfirmCheckbox
          checked={termsAccepted}
          onCheckedChange={setTermsAccepted}
          label="I agree to the Terms and Conditions and Privacy Policy"
        >
          I agree to the{' '}
          <button
            type="button"
            className="font-medium text-ppg-orange underline underline-offset-2"
            onClick={() => setTermsOpen(true)}
          >
            Terms &amp; Conditions
          </button>{' '}
          and{' '}
          <button
            type="button"
            className="font-medium text-ppg-orange underline underline-offset-2"
            onClick={() => setPrivacyOpen(true)}
          >
            Privacy Policy
          </button>
          .
        </ConfirmCheckbox>

        <hr className="my-3 border-0 border-t border-ppg-border" />

        <ConfirmCheckbox
          checked={noDangerousGoods}
          onCheckedChange={setNoDangerousGoods}
          label="No dangerous goods"
        >
          <p className="font-bold text-black">No dangerous goods</p>
          <p className="mt-0.5 text-ppg-label">
            I confirm this parcel does not contain prohibited or dangerous goods.
          </p>
        </ConfirmCheckbox>

        <hr className="my-3 border-0 border-t border-ppg-border" />

        <ConfirmCheckbox
          checked={marketingOptIn}
          onCheckedChange={setMarketingOptIn}
          label="Marketing and promotional communications opt-in"
        >
          I would like to receive marketing and promotional communications from
          PARCELPOINT.
        </ConfirmCheckbox>
      </section>

      <TermsAndConditionsModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
      />
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />

      <input type="hidden" name="termsAccepted" value={termsAccepted ? 'yes' : 'no'} />
      <input
        type="hidden"
        name="noDangerousGoods"
        value={noDangerousGoods ? 'yes' : 'no'}
      />
      <input
        type="hidden"
        name="marketingOptIn"
        value={marketingOptIn ? 'yes' : 'no'}
      />
      <input type="hidden" name="couponCode" value={appliedCoupon?.code ?? ''} />

      <section className="rounded-2xl border border-ppg-border bg-white p-4">
        <p className="text-base font-bold text-black">Price Summary</p>

        <ul className="mt-3 space-y-2.5">
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

        {!appliedCoupon ? (
          <div className="mt-4">
            <FormField label="Coupon code" htmlFor="confirm-coupon-code">
              <div className="flex gap-2">
                <TextInput
                  id="confirm-coupon-code"
                  name="couponCodeInput"
                  value={couponInput}
                  onChange={(event) => {
                    setCouponInput(event.target.value)
                    if (couponError) setCouponError(null)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      applyCoupon()
                    }
                  }}
                  placeholder="Enter code"
                  autoComplete="off"
                  spellCheck={false}
                  aria-invalid={couponError ? true : undefined}
                  aria-describedby={
                    couponError ? 'confirm-coupon-error' : undefined
                  }
                  className="min-w-0 flex-1"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="shrink-0 rounded-[10px] border border-ppg-orange bg-white px-4 py-2.5 text-sm font-bold text-ppg-orange transition-colors hover:bg-[#fff5f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
                >
                  Apply
                </button>
              </div>
            </FormField>
            {couponError ? (
              <p
                id="confirm-coupon-error"
                className="mt-1.5 text-xs text-[#c62828]"
                role="alert"
              >
                {couponError}
              </p>
            ) : null}
          </div>
        ) : null}

        {appliedCoupon ? (
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[#2e9e4f]">
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate">Coupon ({appliedCoupon.code})</span>
              <button
                type="button"
                onClick={removeCoupon}
                className="shrink-0 text-xs font-medium text-ppg-orange underline underline-offset-2"
              >
                Remove
              </button>
            </span>
            <span className="font-semibold tabular-nums">
              −{formatMoney(appliedCoupon.discount)}
            </span>
          </div>
        ) : null}

        <hr className="my-4 border-0 border-t border-ppg-border" />

        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-black">Total</span>
          <span className="text-lg font-bold text-black tabular-nums">
            {formatMoney(totalAmount)}
          </span>
        </div>
      </section>
    </BookingStepShell>
  )
}
