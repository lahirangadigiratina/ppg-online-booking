import { PenLine, Shield } from 'lucide-react'
import { useState } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { AddOnOptionCard } from './AddOnOptionCard'

type AddOnsFormProps = {
  onContinue: () => void
}

export function AddOnsForm({ onContinue }: AddOnsFormProps) {
  const [signatureOnDelivery, setSignatureOnDelivery] = useState(true)
  const [parcelProtection, setParcelProtection] = useState(false)

  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <StepHeading step={6} title="Add-ons" />
          <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs font-medium text-ppg-label">
            Optional
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <AddOnOptionCard
            title="Signature on Delivery"
            description="Recipient must sign upon delivery"
            price="$2.20"
            icon={PenLine}
            selected={signatureOnDelivery}
            onToggle={() => setSignatureOnDelivery((previous) => !previous)}
          />

          <AddOnOptionCard
            title="Parcel Protection"
            description="Covers your parcel valued at $50"
            price="$5.50"
            icon={Shield}
            selected={parcelProtection}
            onToggle={() => setParcelProtection((previous) => !previous)}
          />
        </div>

        <input
          type="hidden"
          name="signatureOnDelivery"
          value={signatureOnDelivery ? 'yes' : 'no'}
        />
        <input
          type="hidden"
          name="parcelProtection"
          value={parcelProtection ? 'yes' : 'no'}
        />

        <div className="flex justify-end pt-2">
          <ContinueButton type="submit" />
        </div>
      </form>
    </>
  )
}
