import { PenLine, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AddOnOptionCard } from './AddOnOptionCard'
import { ParcelProtectionModal } from './ParcelProtectionModal'

const INCLUDED_PROTECTION_MAX_VALUE = 100

type AddOnsSectionProps = {
  declaredParcelValue: number
}

function formatParcelValue(value: number) {
  if (Number.isInteger(value)) {
    return String(value)
  }
  return value.toFixed(2).replace(/\.?0+$/, '')
}

export function AddOnsSection({ declaredParcelValue }: AddOnsSectionProps) {
  const [signatureOnDelivery, setSignatureOnDelivery] = useState(false)
  const [parcelProtection, setParcelProtection] = useState(false)
  const [protectionInfoOpen, setProtectionInfoOpen] = useState(false)

  const isProtectionIncluded =
    Number.isFinite(declaredParcelValue) &&
    declaredParcelValue >= 0 &&
    declaredParcelValue <= INCLUDED_PROTECTION_MAX_VALUE

  const safeDeclaredValue = Number.isFinite(declaredParcelValue)
    ? Math.max(0, declaredParcelValue)
    : 0
  const protectionDescription = `Cover your parcel valued at $${formatParcelValue(
    safeDeclaredValue,
  )}`

  useEffect(() => {
    if (isProtectionIncluded) {
      setParcelProtection(false)
    }
  }, [isProtectionIncluded])

  const parcelProtectionActive = isProtectionIncluded || parcelProtection

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-bold text-black">Add-ons</h2>
        <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs font-medium text-ppg-label">
          Optional
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <AddOnOptionCard
          title="Signature on Delivery"
          description="Recipient must sign upon delivery"
          price="+$3.50"
          icon={PenLine}
          selected={signatureOnDelivery}
          onToggle={() => setSignatureOnDelivery((previous) => !previous)}
        />

        <AddOnOptionCard
          title="Parcel Protection"
          description={protectionDescription}
          price={isProtectionIncluded ? 'Included' : '+$2.50'}
          icon={Shield}
          included={isProtectionIncluded}
          selectable={!isProtectionIncluded}
          selected={parcelProtection}
          onToggle={() => setParcelProtection((previous) => !previous)}
          linkLabel="Parcel Protection Conditions"
          onLinkClick={() => setProtectionInfoOpen(true)}
        />
      </div>

      <ParcelProtectionModal
        open={protectionInfoOpen}
        onClose={() => setProtectionInfoOpen(false)}
      />

      <input
        type="hidden"
        name="signatureOnDelivery"
        value={signatureOnDelivery ? 'yes' : 'no'}
      />
      <input
        type="hidden"
        name="parcelProtection"
        value={parcelProtectionActive ? 'yes' : 'no'}
      />
      <input
        type="hidden"
        name="parcelProtectionIncluded"
        value={isProtectionIncluded ? 'yes' : 'no'}
      />
    </>
  )
}
