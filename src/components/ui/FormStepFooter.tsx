import type { ReactNode } from 'react'
import { BackButton } from './BackButton'

const footerPrimaryButtonClass =
  '[&>button]:h-12 [&>button]:w-full [&>button]:min-w-0 [&>button]:max-w-none [&>button]:px-3 [&>button]:text-base'

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
      <div
        className={`grid grid-cols-2 items-stretch gap-3 pt-2 ${className}`}
      >
        <BackButton
          onClick={onBack}
          className="h-12 w-full min-w-0 max-w-none px-3 text-base"
        />
        <div className={`flex min-w-0 ${footerPrimaryButtonClass}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-end pt-2 ${className}`}>{children}</div>
  )
}
