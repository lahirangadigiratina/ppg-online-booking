import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import { PAY_ONLINE_FORM_ID, PayOnlineCardForm } from './PayOnlineCardForm'

type PayOnlineScreenProps = {
  onBack: () => void
  onPaymentComplete: () => void
}

/** Standalone card step (legacy); payment flow uses merged PaymentMethodScreen. */
export function PayOnlineScreen({
  onBack,
  onPaymentComplete,
}: PayOnlineScreenProps) {
  return (
    <BookingStepShell
      footer={
        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" form={PAY_ONLINE_FORM_ID}>
            Pay
          </ContinueButton>
        </FormStepFooter>
      }
    >
      <StepHeading compact step={8} title="Card payment" />
      <PayOnlineCardForm
        onSubmit={(event) => {
          event.preventDefault()
          onPaymentComplete()
        }}
      />
    </BookingStepShell>
  )
}
