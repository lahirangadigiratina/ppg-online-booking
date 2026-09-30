import { useEffect } from 'react'
import paymentQrImage from '../../assets/payment-qr-only.png'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'

const TOTAL_AMOUNT = '$17.66'
const AGENT_SCAN_DELAY_MS = 6000

type ShowAgentQrScreenProps = {
  onAgentScanned: () => void
}

export function ShowAgentQrScreen({ onAgentScanned }: ShowAgentQrScreenProps) {
  useEffect(() => {
    const timerId = window.setTimeout(onAgentScanned, AGENT_SCAN_DELAY_MS)
    return () => window.clearTimeout(timerId)
  }, [onAgentScanned])

  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <div className="flex flex-col items-center gap-5 pb-2 text-center">
        <div>
          <h1 className="text-xl font-bold text-black">Show this to the agent</h1>
          <p className="mt-2 text-sm leading-snug text-ppg-label">
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

        <p className="flex items-center justify-center gap-2 text-sm text-ppg-label">
          <span
            className="size-2 shrink-0 rounded-full bg-ppg-orange"
            aria-hidden
          />
          Waiting for agent to scan…
        </p>
      </div>
    </>
  )
}
