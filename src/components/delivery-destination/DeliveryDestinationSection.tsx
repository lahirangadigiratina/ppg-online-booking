import { useState } from 'react'
import type { DoorBookingRoute } from '../../booking/bookingRoute'
import collectParcelPointIcon from '../../assets/icon-collect-parcelpoint.png'
import deliverToDoorIcon from '../../assets/icon-deliver-to-door.png'
import { AddressSearchSelect } from '../form/AddressSearchSelect'
import { FormField } from '../form/FormField'
import type { CollectStore } from './collectStoreOptions'
import { CollectParcelPointModal } from './CollectParcelPointModal'
import { DeliveryOptionCard } from './DeliveryOptionCard'
import type { CollectRadiusOption } from './CollectRadiusSelect'

export type DeliveryMethod = 'door-atl' | 'door-atl-only' | 'parcelpoint'

type DeliveryDestinationSectionProps = {
  doorBookingRoute: DoorBookingRoute
  deliveryMethod: DeliveryMethod | null
  onDeliveryMethodChange: (method: DeliveryMethod) => void
}

export function DeliveryDestinationSection({
  doorBookingRoute,
  deliveryMethod,
  onDeliveryMethodChange,
}: DeliveryDestinationSectionProps) {
  const [collectRadius, setCollectRadius] =
    useState<CollectRadiusOption>('2 km')
  const [collectModalOpen, setCollectModalOpen] = useState(false)
  const [selectedCollectStore, setSelectedCollectStore] = useState<
    CollectStore | undefined
  >()

  const showAtlSignatureCard = doorBookingRoute === 'atl'
  const showAtlOnlyCard = doorBookingRoute === 'atl-only'

  return (
    <>
      <FormField label="Receiver Address" htmlFor="receiverAddress">
        <AddressSearchSelect id="receiverAddress" name="receiverAddress" />
      </FormField>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-normal text-ppg-label">
          How would you like it received?
        </h2>

        <div className="flex flex-col gap-3">
          {showAtlSignatureCard ? (
            <DeliveryOptionCard
              title="Deliver to Door"
              subtitle="Bondi Junction 2022"
              price="$11.50"
              tags={[
                {
                  emoji: '🏠',
                  label:
                    'Straight to door - ATL/Signature on Delivery available',
                },
              ]}
              iconSrc={collectParcelPointIcon}
              iconAlt="Deliver to door with ATL or signature on delivery"
              footerAddress="25 Spring St, Bondi Junction NSW 2022"
              footerDeliveredByDate="Mon, 12 Oct"
              selected={deliveryMethod === 'door-atl'}
              onSelect={() => {
                onDeliveryMethodChange('door-atl')
                setCollectModalOpen(false)
              }}
            />
          ) : null}

          {showAtlOnlyCard ? (
            <DeliveryOptionCard
              title="Deliver to Door"
              subtitle="Bondi Junction 2022"
              price="$11.50"
              tags={[
                { emoji: '🏠', label: 'Straight to door - ATL delivery' },
              ]}
              iconSrc={collectParcelPointIcon}
              iconAlt="Deliver to door with ATL delivery only"
              footerAddress="25 Spring St, Bondi Junction NSW 2022"
              footerDeliveredByDate="Mon, 12 Oct"
              selected={deliveryMethod === 'door-atl-only'}
              onSelect={() => {
                onDeliveryMethodChange('door-atl-only')
                setCollectModalOpen(false)
              }}
            />
          ) : null}

          <DeliveryOptionCard
              title="Collect from PARCELPOINT"
              subtitle={
                deliveryMethod === 'parcelpoint' && selectedCollectStore
                  ? `${selectedCollectStore.name} · ${collectRadius}`
                  : deliveryMethod === 'parcelpoint'
                    ? `Within ${collectRadius} · Tap to choose a store`
                    : "They collect when they're ready"
              }
              price="$11.50"
              tags={[
                { emoji: '✅', label: 'Held until collection' },
                { emoji: '💰', label: 'Often lower cost' },
                { emoji: '⏰', label: 'Hours that suit them' },
              ]}
              iconSrc={deliverToDoorIcon}
              iconAlt="Collect from PARCELPOINT"
              selected={deliveryMethod === 'parcelpoint'}
              onSelect={() => {
                onDeliveryMethodChange('parcelpoint')
                setCollectModalOpen(true)
              }}
            />
        </div>
      </section>

      <input type="hidden" name="doorBookingRoute" value={doorBookingRoute} />
      <input type="hidden" name="deliveryMethod" value={deliveryMethod ?? ''} />
      <input type="hidden" name="collectRadius" value={collectRadius} />
      <input
        type="hidden"
        name="collectStoreId"
        value={selectedCollectStore?.id ?? ''}
      />

      <CollectParcelPointModal
        open={collectModalOpen}
        radius={collectRadius}
        selectedStoreId={selectedCollectStore?.id}
        onRadiusChange={setCollectRadius}
        onSelectStore={setSelectedCollectStore}
        onClose={() => setCollectModalOpen(false)}
      />
    </>
  )
}
