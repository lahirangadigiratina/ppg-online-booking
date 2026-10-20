import { PenLine, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AddOnOptionCard } from './AddOnOptionCard'
import { ParcelProtectionModal } from './ParcelProtectionModal'
import {
  formatParcelProtectionAddonPrice,
  isParcelProtectionFullyIncluded,
  parseDeclaredParcelValue,
  parcelProtectionAdditionalBlocks,
  parcelProtectionAddonFee,
} from './parcelProtectionPricing'

type AddOnsSectionProps = {
  parcelValueInput: string
}

function formatParcelValue(value: number) {
  if (Number.isInteger(value)) {
    return String(value)
  }
  return value.toFixed(2).replace(/\.?0+$/, '')
}

export function AddOnsSection({ parcelValueInput }: AddOnsSectionProps) {
  const [signatureOnDelivery, setSignatureOnDelivery] = useState(false)
  const [parcelProtection, setParcelProtection] = useState(false)
  const [protectionInfoOpen, setProtectionInfoOpen] = useState(false)

  const safeDeclaredValue = parseDeclaredParcelValue(parcelValueInput)
  const isProtectionIncluded = isParcelProtectionFullyIncluded(safeDeclaredValue)
  const protectionAddonFee = parcelProtectionAddonFee(safeDeclaredValue)
  const additionalBlocks = parcelProtectionAdditionalBlocks(safeDeclaredValue)

  const protectionPriceLabel = isProtectionIncluded
    ? 'Included'
    : formatParcelProtectionAddonPrice(protectionAddonFee)

  const protectionDescription = isProtectionIncluded
    ? `Cover your parcel valued at $${formatParcelValue(safeDeclaredValue)}`
    : `First $100 included. Cover up to $${formatParcelValue(
        safeDeclaredValue,
      )} for ${formatParcelProtectionAddonPrice(protectionAddonFee).replace(
        '+',
        '',
      )} (${additionalBlocks} × $2.50 per additional $100).`

  useEffect(() => {
    if (isProtectionIncluded) {
      setParcelProtection(false)
    }
  }, [isProtectionIncluded])

  const parcelProtectionActive =
    isProtectionIncluded || (parcelProtection && protectionAddonFee > 0)

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm font-bold text-black">Add-ons</h2>
        <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs font-medium text-ppg-label">
          Optional
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <AddOnOptionCard
          title="Signature on Delivery"
          description="Recipient must sign upon delivery"
          price="+$3.50"
          icon={PenLine}
          selected={signatureOnDelivery}
          onToggle={() => setSignatureOnDelivery((previous) => !previous)}
        />

        <AddOnOptionCard
          key={`parcel-protection-${safeDeclaredValue}-${protectionPriceLabel}`}
          title="Parcel Protection"
          description={protectionDescription}
          price={protectionPriceLabel}
          icon={Shield}
          included={isProtectionIncluded}
          selectable={!isProtectionIncluded && protectionAddonFee > 0}
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
      <input
        type="hidden"
        name="parcelProtectionFee"
        value={
          parcelProtectionActive && !isProtectionIncluded
            ? protectionAddonFee.toFixed(2)
            : ''
        }
      />
    </>
  )
}
