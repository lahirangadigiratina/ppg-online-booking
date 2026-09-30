import { CreditCard, Store } from 'lucide-react'
import { useState } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { PaymentMethodCard } from './PaymentMethodCard'

export type PaymentMethod = 'online' | 'in-store'

type PaymentFormProps = {
  onPayNow: (method: PaymentMethod) => void
}

const TOTAL_AMOUNT = '$17.66'

export function PaymentForm({ onPayNow }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online')

  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          onPayNow(paymentMethod)
        }}
      >
        <StepHeading step={8} title="How would you like to pay?" />

        <div className="flex flex-col gap-3">
          <PaymentMethodCard
            title="Pay Online"
            description="Pay now with card — nothing more to do in-store."
            icon={CreditCard}
            iconClassName="text-[#e8b923]"
            selected={paymentMethod === 'online'}
            onSelect={() => setPaymentMethod('online')}
          />

          <PaymentMethodCard
            title="Pay In Store"
            description="Show a QR code to the agent & tap your card there."
            icon={Store}
            iconClassName="text-[#4a90c2]"
            selected={paymentMethod === 'in-store'}
            onSelect={() => setPaymentMethod('in-store')}
          />
        </div>

        <input type="hidden" name="paymentMethod" value={paymentMethod} />

        <div className="pt-2 text-center">
          <p className="text-sm text-ppg-label">Total to pay</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-black">
            {TOTAL_AMOUNT}
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-ppg-orange py-3.5 text-base font-bold text-white transition-colors hover:bg-ppg-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
        >
          Pay Now
        </button>
      </form>
    </>
  )
}
