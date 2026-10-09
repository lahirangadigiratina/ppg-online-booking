import { useState } from 'react'
import collectParcelPointIcon from '../../assets/icon-collect-parcelpoint.png'
import deliverToDoorIcon from '../../assets/icon-deliver-to-door.png'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { AddressSearchSelect } from '../form/AddressSearchSelect'
import { FormField } from '../form/FormField'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import type { CollectStore } from './collectStoreOptions'
import { CollectParcelPointModal } from './CollectParcelPointModal'
import { DeliveryOptionCard } from './DeliveryOptionCard'
import type { CollectRadiusOption } from './CollectRadiusSelect'

type DeliveryMethod = 'door' | 'parcelpoint'

type DeliveryDestinationFormProps = {
  onBack: () => void
  onContinue: () => void
}

export function DeliveryDestinationForm({
  onBack,
  onContinue,
}: DeliveryDestinationFormProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('door')
  const [collectRadius, setCollectRadius] =
    useState<CollectRadiusOption>('2 km')
  const [collectModalOpen, setCollectModalOpen] = useState(false)
  const [selectedCollectStore, setSelectedCollectStore] = useState<
    CollectStore | undefined
  >()

  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        noValidate
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <StepHeading step={4} title="Where are you sending to?" />

        <FormField label="Receiver Address" htmlFor="receiverAddress">
          <AddressSearchSelect id="receiverAddress" name="receiverAddress" />
        </FormField>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-normal text-ppg-label">
            How would you like it received?
          </h2>

          <div className="flex flex-col gap-3">
            <DeliveryOptionCard
              title="Deliver to Door"
              subtitle="Bondi Junction 2022"
              price="$11.50"
              tags={[
                { emoji: '⭐', label: 'Popular choice' },
                { emoji: '🏠', label: 'Straight to their door' },
              ]}
              iconSrc={deliverToDoorIcon}
              iconAlt="Deliver to door"
              footerAddress="25 Spring St, Bondi Junction NSW 2022"
              footerDeliveredByDate="Mon, 12 Oct"
              selected={deliveryMethod === 'door'}
              onSelect={() => {
                setDeliveryMethod('door')
                setCollectModalOpen(false)
              }}
            />

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
              iconSrc={collectParcelPointIcon}
              iconAlt="Collect from PARCELPOINT"
              selected={deliveryMethod === 'parcelpoint'}
              onSelect={() => {
                setDeliveryMethod('parcelpoint')
                setCollectModalOpen(true)
              }}
            />
          </div>
        </section>

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

        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" />
        </FormStepFooter>
      </form>
    </>
  )
}
