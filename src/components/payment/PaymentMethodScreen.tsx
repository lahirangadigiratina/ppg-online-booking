import { Banknote, Check, CreditCard } from 'lucide-react'
import { useState } from 'react'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import { PAY_ONLINE_FORM_ID, PayOnlineCardForm } from './PayOnlineCardForm'

const TOTAL_AMOUNT = '$17.66'

export type PaymentMethodChoice = 'card' | 'cash'

type PaymentMethodScreenProps = {
  onBack: () => void
  onContinue: (method: PaymentMethodChoice) => void
}

type MethodOptionProps = {
  title: string
  description: string
  icon: typeof CreditCard
  selected: boolean
  onSelect: () => void
}

function MethodOption({
  title,
  description,
  icon: Icon,
  selected,
  onSelect,
}: MethodOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative w-full rounded-2xl border-2 p-4 text-left transition-colors ${
        selected
          ? 'border-ppg-orange bg-[#fff5f2]'
          : 'border-ppg-border bg-white hover:border-[#d0d0d0]'
      }`}
    >
      {selected ? (
        <span className="pointer-events-none absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-ppg-orange text-white">
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
      ) : null}
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f3f3]">
          <Icon className="size-5 text-black" strokeWidth={1.75} aria-hidden />
        </span>
        <div className={`min-w-0 flex-1 ${selected ? 'pr-6' : ''}`}>
          <p className="text-base font-bold leading-snug text-black">{title}</p>
          <p className="mt-1 text-sm leading-snug text-ppg-label">{description}</p>
        </div>
      </div>
    </button>
  )
}

export function PaymentMethodScreen({
  onBack,
  onContinue,
}: PaymentMethodScreenProps) {
  const [method, setMethod] = useState<PaymentMethodChoice | null>(null)
  const [cardPaymentValid, setCardPaymentValid] = useState(false)

  function handleBack() {
    if (method === 'card') {
      setMethod(null)
      return
    }
    onBack()
  }

  const payOnlineSelected = method === 'card'
  const canContinueFooter =
    method === 'cash' || (payOnlineSelected && cardPaymentValid)

  return (
    <BookingStepShell
      footerKey={method ?? 'none'}
      footer={
        <FormStepFooter onBack={handleBack}>
          {payOnlineSelected ? (
            <ContinueButton
              type="submit"
              form={PAY_ONLINE_FORM_ID}
              label="Pay"
              disabled={!cardPaymentValid}
            />
          ) : (
            <ContinueButton
              type="button"
              label={method === 'cash' ? 'Next' : 'Continue'}
              disabled={!canContinueFooter}
              onClick={() => {
                if (method === 'cash') {
                  onContinue('cash')
                }
              }}
            />
          )}
        </FormStepFooter>
      }
    >
      <StepHeading compact step={7} title="Payment method" />
      <p className="text-xs leading-snug text-ppg-label">
        Choose how you&apos;d like to pay {TOTAL_AMOUNT} for this booking.
      </p>

      <div className="flex flex-col gap-2">
        <MethodOption
          title="Pay Online"
          description="Payment gateway"
          icon={CreditCard}
          selected={payOnlineSelected}
          onSelect={() => {
            setMethod('card')
            setCardPaymentValid(false)
          }}
        />

        {payOnlineSelected ? (
          <PayOnlineCardForm
            totalAmount={TOTAL_AMOUNT}
            onValidityChange={setCardPaymentValid}
            onSubmit={(event) => {
              event.preventDefault()
              if (!cardPaymentValid) return
              onContinue('card')
            }}
          />
        ) : null}

        <MethodOption
          title="Pay Instore"
          description="EFTPOS and cash"
          icon={Banknote}
          selected={method === 'cash'}
          onSelect={() => {
            setMethod('cash')
            setCardPaymentValid(false)
          }}
        />
      </div>

      <input type="hidden" name="paymentMethod" value={method ?? ''} />
    </BookingStepShell>
  )
}
