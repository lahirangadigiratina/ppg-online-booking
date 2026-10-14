import { useCallback, useState } from 'react'
import type { DoorBookingRoute } from '../booking/bookingRoute'
import { BookingSuccessScreen } from '../components/booking-success/BookingSuccessScreen'
import { ConfirmAcceptForm } from '../components/confirm-accept/ConfirmAcceptForm'
import {
  PHONE_SCREEN_MIN_HEIGHT_PX,
  PhoneFrame,
} from '../components/layout/PhoneFrame'
import { PayOnlineScreen } from '../components/payment/PayOnlineScreen'
import { ShowAgentQrScreen } from '../components/payment/ShowAgentQrScreen'
import { ParcelContentsForm } from '../components/parcel-contents/ParcelContentsForm'
import { ParcelSizePackagingForm } from '../components/parcel-size/ParcelSizePackagingForm'
import { ReceiverDetailsForm } from '../components/receiver-details/ReceiverDetailsForm'
import { YourDetailsForm } from '../components/your-details/YourDetailsForm'

type BookingStep =
  | 'parcel-size-packaging'
  | 'your-details'
  | 'receiver-details'
  | 'parcel-contents'
  | 'confirm-accept'
  | 'payment'
  | 'agent-qr'
  | 'booking-success'

type BookingPageProps = {
  doorBookingRoute: DoorBookingRoute
}

export function BookingPage({ doorBookingRoute }: BookingPageProps) {
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
    step === 'parcel-size-packaging' ||
    step === 'receiver-details' ||
    step === 'parcel-contents' ||
    step === 'confirm-accept' ||
    step === 'payment' ||
    step === 'agent-qr' ||
    step === 'booking-success'

  return (
    <div className="flex h-[100dvh] min-h-0 w-full flex-col items-center overflow-hidden sm:h-auto sm:min-h-svh sm:justify-center sm:overflow-visible sm:bg-[#f3f3f3] sm:px-4 sm:py-8">
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
            doorBookingRoute={doorBookingRoute}
            onContinue={() => setStep('your-details')}
          />
        )}
        {step === 'your-details' && (
          <YourDetailsForm
            onBack={() => setStep('parcel-size-packaging')}
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
          <PayOnlineScreen
            onBack={() => setStep('confirm-accept')}
            onPaymentComplete={() => setStep('booking-success')}
          />
        )}
        {step === 'agent-qr' && (
          <ShowAgentQrScreen
            onBack={() => setStep('payment')}
            onAgentScanned={handleAgentScanned}
          />
        )}
        {step === 'booking-success' && <BookingSuccessScreen />}
      </PhoneFrame>
    </div>
  )
}
