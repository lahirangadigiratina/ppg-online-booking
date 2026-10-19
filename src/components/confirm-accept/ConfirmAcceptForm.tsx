import { Check } from 'lucide-react'
import { useState, type ReactNode } from 'react'
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

const CONFIRM_TOTAL = '$19.31'

export function ConfirmAcceptForm({
  onBack,
  onContinueToPayment,
}: ConfirmAcceptFormProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [noDangerousGoods, setNoDangerousGoods] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

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
      <StepHeading compact step={5} title="Confirm & Accept" />

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

      <section className="rounded-xl border border-ppg-border bg-white p-3">
        <p className="text-sm font-bold text-black">Price Summary</p>

        <ul className="mt-2 space-y-1.5">
          {PRICE_LINES.map((line) => (
            <li
              key={line.label}
              className="flex items-center justify-between gap-3 text-xs text-black"
            >
              <span>{line.label}</span>
              <span className="font-semibold">{line.amount}</span>
            </li>
          ))}
        </ul>

        <hr className="my-2.5 border-0 border-t border-ppg-border" />

        <div className="flex items-center justify-between gap-3">
          <span className="text-base font-bold text-black">Total</span>
          <span className="text-base font-bold text-black">{CONFIRM_TOTAL}</span>
        </div>
      </section>
    </BookingStepShell>
  )
}
