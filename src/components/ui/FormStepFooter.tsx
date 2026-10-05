import type { ReactNode } from 'react'
import { BackButton } from './BackButton'

type FormStepFooterProps = {
  onBack?: () => void
  children: ReactNode
  className?: string
}

export function FormStepFooter({
  onBack,
  children,
  className = '',
}: FormStepFooterProps) {
  if (onBack) {
    return (
      <div className={`grid grid-cols-2 gap-3 pt-2 ${className}`}>
        <BackButton onClick={onBack} className="w-full min-w-0 px-4" />
        <div className="min-w-0 [&>button]:w-full [&>button]:min-w-0">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-end pt-2 ${className}`}>{children}</div>
  )
}
