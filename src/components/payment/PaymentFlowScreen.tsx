import { useState } from 'react'
import {
  PaymentMethodScreen,
  type PaymentMethodChoice,
} from './PaymentMethodScreen'
import { PayOnlineScreen } from './PayOnlineScreen'

type PaymentFlowPhase = 'method' | 'card'

type PaymentFlowScreenProps = {
  onBack: () => void
  onComplete: (method: PaymentMethodChoice) => void
}

export function PaymentFlowScreen({
  onBack,
  onComplete,
}: PaymentFlowScreenProps) {
  const [phase, setPhase] = useState<PaymentFlowPhase>('method')

  if (phase === 'card') {
    return (
      <PayOnlineScreen
        onBack={() => setPhase('method')}
        onPaymentComplete={() => onComplete('card')}
      />
    )
  }

  return (
    <PaymentMethodScreen
      onBack={onBack}
      onContinue={(method) => {
        if (method === 'cash') {
          onComplete('cash')
          return
        }
        setPhase('card')
      }}
    />
  )
}
