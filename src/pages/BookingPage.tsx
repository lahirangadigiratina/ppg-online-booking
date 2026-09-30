import { useCallback, useState } from 'react'
import { AddOnsForm } from '../components/add-ons/AddOnsForm'
import { BookingSuccessScreen } from '../components/booking-success/BookingSuccessScreen'
import { ConfirmAcceptForm } from '../components/confirm-accept/ConfirmAcceptForm'
import { DeliveryDestinationForm } from '../components/delivery-destination/DeliveryDestinationForm'
import {
  PHONE_SCREEN_MIN_HEIGHT_PX,
  PhoneFrame,
} from '../components/layout/PhoneFrame'
import { PayOnlineScreen } from '../components/payment/PayOnlineScreen'
import { PaymentForm } from '../components/payment/PaymentForm'
import { ShowAgentQrScreen } from '../components/payment/ShowAgentQrScreen'
import { ParcelContentsForm } from '../components/parcel-contents/ParcelContentsForm'
import { ParcelSizePackagingForm } from '../components/parcel-size/ParcelSizePackagingForm'
import { ReceiverDetailsForm } from '../components/receiver-details/ReceiverDetailsForm'
import { YourDetailsForm } from '../components/your-details/YourDetailsForm'

type BookingStep =
  | 'parcel-size-packaging'
  | 'your-details'
  | 'receiver-details'
  | 'delivery-destination'
  | 'parcel-contents'
  | 'add-ons'
  | 'confirm-accept'
  | 'payment'
  | 'agent-qr'
  | 'pay-online'
  | 'booking-success'

export function BookingPage() {
  const [step, setStep] = useState<BookingStep>('parcel-size-packaging')
  const [phoneScreenHeight, setPhoneScreenHeight] = useState<number>()

  const handlePhoneMeasure = useCallback((height: number) => {
    const nextHeight = Math.max(height, PHONE_SCREEN_MIN_HEIGHT_PX)
    setPhoneScreenHeight((previous) =>
      previous === undefined ? nextHeight : Math.max(previous, nextHeight),
    )
  }, [])

  const handleAgentScanned = useCallback(() => {
    setStep('booking-success')
  }, [])

  const lockPhoneHeight =
    step === 'receiver-details' ||
    step === 'delivery-destination' ||
    step === 'parcel-contents' ||
    step === 'add-ons' ||
    step === 'confirm-accept' ||
    step === 'payment' ||
    step === 'agent-qr' ||
    step === 'pay-online' ||
    step === 'booking-success'

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-8">
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
      >
        {step === 'parcel-size-packaging' && (
          <ParcelSizePackagingForm
            onContinue={() => setStep('your-details')}
          />
        )}
        {step === 'your-details' && (
          <YourDetailsForm onContinue={() => setStep('receiver-details')} />
        )}
        {step === 'receiver-details' && (
          <ReceiverDetailsForm
            onContinue={() => setStep('delivery-destination')}
          />
        )}
        {step === 'delivery-destination' && (
          <DeliveryDestinationForm
            onContinue={() => setStep('parcel-contents')}
          />
        )}
        {step === 'parcel-contents' && (
          <ParcelContentsForm onContinue={() => setStep('add-ons')} />
        )}
        {step === 'add-ons' && (
          <AddOnsForm onContinue={() => setStep('confirm-accept')} />
        )}
        {step === 'confirm-accept' && (
          <ConfirmAcceptForm
            onContinueToPayment={() => setStep('payment')}
          />
        )}
        {step === 'payment' && (
          <PaymentForm
            onPayNow={(method) =>
              setStep(method === 'in-store' ? 'agent-qr' : 'pay-online')
            }
          />
        )}
        {step === 'agent-qr' && (
          <ShowAgentQrScreen onAgentScanned={handleAgentScanned} />
        )}
        {step === 'pay-online' && <PayOnlineScreen />}
        {step === 'booking-success' && <BookingSuccessScreen />}
      </PhoneFrame>
    </div>
  )
}
