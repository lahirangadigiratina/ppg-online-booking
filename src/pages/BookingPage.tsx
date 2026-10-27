import { useCallback, useMemo, useState } from 'react'
import type { DoorBookingRoute } from '../booking/bookingRoute'
import { BookingSuccessScreen } from '../components/booking-success/BookingSuccessScreen'
import { ConfirmAcceptForm } from '../components/confirm-accept/ConfirmAcceptForm'
import {
  DEFAULT_SENDING_PARCELPOINT_STORE_ID,
  getCollectStoreById,
  getSendingParcelPointStore,
} from '../components/delivery-destination/collectStoreOptions'
import {
  PHONE_SCREEN_MIN_HEIGHT_PX,
  PhoneFrame,
} from '../components/layout/PhoneFrame'
import type { DeliveryMethod } from '../components/delivery-destination/DeliveryDestinationSection'
import { DeliveryDestinationStepForm } from '../components/delivery-destination/DeliveryDestinationStepForm'
import { PaymentFlowScreen } from '../components/payment/PaymentFlowScreen'
import { ParcelContentsForm } from '../components/parcel-contents/ParcelContentsForm'
import { ReceiverDetailsForm } from '../components/receiver-details/ReceiverDetailsForm'
import { SendingFromParcelPointForm } from '../components/sending-from/SendingFromParcelPointForm'
import { YourDetailsForm } from '../components/your-details/YourDetailsForm'

type BookingStep =
  | 'sending-from-parcelpoint'
  | 'delivery-destination'
  | 'your-details'
  | 'receiver-details'
  | 'parcel-contents'
  | 'confirm-accept'
  | 'payment'
  | 'booking-success-cash'
  | 'booking-success-card'

type BookingPageProps = {
  doorBookingRoute: DoorBookingRoute
}

export function BookingPage({ doorBookingRoute }: BookingPageProps) {
  const [step, setStep] = useState<BookingStep>('sending-from-parcelpoint')
  const [phoneScreenHeight, setPhoneScreenHeight] = useState<number>()
  const [parcelValue, setParcelValue] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(
    null,
  )
  const initialSendingFromStore = useMemo(
    () => getSendingParcelPointStore(),
    [],
  )
  const [sendingFromStoreId, setSendingFromStoreId] = useState(
    DEFAULT_SENDING_PARCELPOINT_STORE_ID,
  )
  const sendingFromStore = useMemo(
    () =>
      getCollectStoreById(sendingFromStoreId) ?? initialSendingFromStore,
    [initialSendingFromStore, sendingFromStoreId],
  )

  const handlePhoneMeasure = useCallback((height: number) => {
    const nextHeight = Math.max(height, PHONE_SCREEN_MIN_HEIGHT_PX)
    setPhoneScreenHeight((previous) =>
      previous === undefined ? nextHeight : Math.max(previous, nextHeight),
    )
  }, [])

  const lockPhoneHeight =
    step === 'sending-from-parcelpoint' ||
    step === 'delivery-destination' ||
    step === 'receiver-details' ||
    step === 'parcel-contents' ||
    step === 'confirm-accept' ||
    step === 'payment' ||
    step === 'booking-success-cash' ||
    step === 'booking-success-card'

  return (
    <div className="flex h-[100dvh] min-h-0 w-full flex-col items-center overflow-hidden bg-[#f3f3f3] px-4 py-4 sm:py-6">
      <div className="flex min-h-0 w-full max-w-[430px] flex-1 flex-col">
        <PhoneFrame
        contentKey={step}
        screenHeight={
          lockPhoneHeight
            ? Math.max(
                phoneScreenHeight ?? PHONE_SCREEN_MIN_HEIGHT_PX,
                PHONE_SCREEN_MIN_HEIGHT_PX,
              )
            : undefined
        }
        onMeasure={lockPhoneHeight ? undefined : handlePhoneMeasure}
        preventScroll
      >
        {step === 'sending-from-parcelpoint' && (
          <SendingFromParcelPointForm
            initialStore={initialSendingFromStore}
            selectedStore={sendingFromStore}
            onSelectedStoreChange={(store) => setSendingFromStoreId(store.id)}
            onContinue={() => setStep('delivery-destination')}
          />
        )}
        {step === 'delivery-destination' && (
          <DeliveryDestinationStepForm
            doorBookingRoute={doorBookingRoute}
            deliveryMethod={deliveryMethod}
            onDeliveryMethodChange={setDeliveryMethod}
            onBack={() => setStep('sending-from-parcelpoint')}
            onContinue={() => setStep('your-details')}
          />
        )}
        {step === 'your-details' && (
          <YourDetailsForm
            onBack={() => setStep('delivery-destination')}
            onContinue={() => setStep('receiver-details')}
          />
        )}
        {step === 'receiver-details' && (
          <ReceiverDetailsForm
            onBack={() => setStep('your-details')}
            onContinue={() => setStep('parcel-contents')}
          />
        )}
        {step === 'parcel-contents' && (
          <ParcelContentsForm
            parcelValue={parcelValue}
            onParcelValueChange={setParcelValue}
            onBack={() => setStep('receiver-details')}
            onContinue={() => setStep('confirm-accept')}
          />
        )}
        {step === 'confirm-accept' && (
          <ConfirmAcceptForm
            onBack={() => setStep('parcel-contents')}
            onContinueToPayment={() => setStep('payment')}
          />
        )}
        {step === 'payment' && (
          <PaymentFlowScreen
            onBack={() => setStep('confirm-accept')}
            onComplete={(method) =>
              setStep(
                method === 'cash'
                  ? 'booking-success-cash'
                  : 'booking-success-card',
              )
            }
          />
        )}
        {step === 'booking-success-cash' && (
          <BookingSuccessScreen key="booking-success-cash" variant="cash" />
        )}
        {step === 'booking-success-card' && (
          <BookingSuccessScreen key="booking-success-card" variant="card" />
        )}
        </PhoneFrame>
      </div>
    </div>
  )
}
