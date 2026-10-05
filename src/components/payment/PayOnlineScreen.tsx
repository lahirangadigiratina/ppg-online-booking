import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { BackButton } from '../ui/BackButton'

const TOTAL_AMOUNT = '$17.66'

type PayOnlineScreenProps = {
  onBack: () => void
}

export function PayOnlineScreen({ onBack }: PayOnlineScreenProps) {
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
        <div className="w-full rounded-2xl border border-ppg-border bg-[#fafafa] px-4 py-8 text-sm text-ppg-label">
          Secure payment gateway placeholder
        </div>
        <div className="flex w-full justify-start">
          <BackButton onClick={onBack} />
        </div>
      </div>
    </>
  )
}
