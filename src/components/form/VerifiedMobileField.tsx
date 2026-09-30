import { CircleCheck, Info } from 'lucide-react'

type VerifiedMobileFieldProps = {
  phoneNumber: string
}

export function VerifiedMobileField({ phoneNumber }: VerifiedMobileFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-ppg-label">Mobile number</span>
        <Info
          className="size-4 text-ppg-orange"
          strokeWidth={2}
          aria-label="Mobile number verified via SMS"
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-xl font-semibold tracking-tight text-black">
          {phoneNumber}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-ppg-verified">
          <CircleCheck className="size-4 shrink-0" strokeWidth={2.25} />
          Verified
        </span>
      </div>
    </div>
  )
}
