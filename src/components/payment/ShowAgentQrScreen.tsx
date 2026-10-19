import { useEffect } from 'react'
import paymentQrImage from '../../assets/payment-qr-only.png'
import { BookingStepShell } from '../layout/BookingStepShell'
import { BackButton } from '../ui/BackButton'

const TOTAL_AMOUNT = '$17.66'
const AGENT_SCAN_DELAY_MS = 6000

type ShowAgentQrScreenProps = {
  onBack: () => void
  onAgentScanned: () => void
}

export function ShowAgentQrScreen({
  onBack,
  onAgentScanned,
}: ShowAgentQrScreenProps) {
  useEffect(() => {
    const timerId = window.setTimeout(onAgentScanned, AGENT_SCAN_DELAY_MS)
    return () => window.clearTimeout(timerId)
  }, [onAgentScanned])

  return (
    <BookingStepShell>
      <div className="flex flex-col items-center gap-4 pb-2 text-center">
        <div>
          <h1 className="text-lg font-bold text-black">Show this to the agent</h1>
          <p className="mt-1.5 text-xs leading-snug text-ppg-label">
            They&apos;ll scan it to charge {TOTAL_AMOUNT} on the store terminal
          </p>
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-[#fafafa] p-5">
          <img
            src={paymentQrImage}
            alt="QR code for store agent to scan"
            className="mx-auto block size-[200px] object-contain"
            width={200}
            height={200}
            decoding="async"
          />
        </div>

        <div className="flex w-full justify-start">
          <BackButton
            onClick={onBack}
            className="h-12 min-h-12 min-w-0 px-6"
          />
        </div>
      </div>
    </BookingStepShell>
  )
}
