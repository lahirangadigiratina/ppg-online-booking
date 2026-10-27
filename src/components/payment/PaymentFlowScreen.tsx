import {
  PaymentMethodScreen,
  type PaymentMethodChoice,
} from './PaymentMethodScreen'

type PaymentFlowScreenProps = {
  onBack: () => void
  onComplete: (method: PaymentMethodChoice) => void
}

export function PaymentFlowScreen({
  onBack,
  onComplete,
}: PaymentFlowScreenProps) {
  return (
    <PaymentMethodScreen onBack={onBack} onContinue={onComplete} />
  )
}
