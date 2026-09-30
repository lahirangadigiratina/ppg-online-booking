import { Search } from 'lucide-react'
import { useState } from 'react'
import collectParcelPointIcon from '../../assets/icon-collect-parcelpoint.png'
import deliverToDoorIcon from '../../assets/icon-deliver-to-door.png'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { FormField } from '../form/FormField'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { DeliveryOptionCard } from './DeliveryOptionCard'

type DeliveryMethod = 'door' | 'parcelpoint'

type DeliveryDestinationFormProps = {
  onContinue: () => void
}

export function DeliveryDestinationForm({
  onContinue,
}: DeliveryDestinationFormProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('door')

  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <StepHeading step={4} title="Where's it going?" />

        <FormField label="Receiver Address" htmlFor="receiverAddress">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ppg-label"
              strokeWidth={2}
              aria-hidden
            />
            <input
              id="receiverAddress"
              name="receiverAddress"
              type="search"
              placeholder="Search for an address"
              required
              className="w-full rounded-[10px] border border-ppg-border bg-white py-3.5 pl-11 pr-4 text-base text-black outline-none transition-colors placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
              autoComplete="street-address"
            />
          </div>
        </FormField>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-normal text-ppg-label">
            How would you like it received?
          </h2>

          <div className="flex flex-col gap-3">
            <DeliveryOptionCard
              title="Deliver to Door"
              description="3 business days after drop off"
              price="$10.85"
              tag="Popular choice"
              tagClassName="bg-[#e8f4fc] text-[#3d7ea6]"
              iconSrc={collectParcelPointIcon}
              iconAlt="Deliver to door"
              iconContainerClassName={
                deliveryMethod === 'door'
                  ? 'border-ppg-orange'
                  : 'border-ppg-border'
              }
              selected={deliveryMethod === 'door'}
              recommended
              onSelect={() => setDeliveryMethod('door')}
            />

            <DeliveryOptionCard
              title="Collect from PARCELPOINT"
              description="They collect when it's ready"
              price="$5.94"
              tag="Often lower cost"
              tagClassName="bg-[#f0f0f0] text-ppg-label"
              iconSrc={deliverToDoorIcon}
              iconAlt="Collect from PARCELPOINT"
              iconContainerClassName={
                deliveryMethod === 'parcelpoint'
                  ? 'border-ppg-orange'
                  : 'border-ppg-border'
              }
              selected={deliveryMethod === 'parcelpoint'}
              onSelect={() => setDeliveryMethod('parcelpoint')}
            />
          </div>
        </section>

        <div className="flex justify-end pt-2">
          <ContinueButton type="submit" />
        </div>
      </form>
    </>
  )
}
