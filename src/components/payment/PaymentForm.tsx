import { CreditCard } from 'lucide-react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'

type PaymentFormProps = {
  onBack: () => void
  onPayNow: () => void
}

const TOTAL_AMOUNT = '$17.66'

export function PaymentForm({ onBack, onPayNow }: PaymentFormProps) {
  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        noValidate
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          onPayNow()
        }}
      >
        <StepHeading step={6} title="Pay online" />

        <section
          className="rounded-2xl border border-ppg-orange bg-[#fff4ec] p-4"
          aria-label="Pay online with card"
        >
          <div className="flex gap-3">
            <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full border border-ppg-orange bg-white">
              <CreditCard
                className="size-5 text-[#e8b923]"
                strokeWidth={1.75}
                aria-hidden
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold leading-snug text-black">
                Pay Online
              </p>
              <p className="mt-1 text-sm leading-snug text-ppg-label">
                Pay now with card — nothing more to do in-store.
              </p>
            </div>
          </div>
        </section>

        <input type="hidden" name="paymentMethod" value="online" />

        <div className="pt-2 text-center">
          <p className="text-sm text-ppg-label">Total to pay</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-black">
            {TOTAL_AMOUNT}
          </p>
        </div>

        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit">Pay Now</ContinueButton>
        </FormStepFooter>
      </form>
    </>
  )
}
