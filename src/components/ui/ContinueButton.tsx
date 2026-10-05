import type { ButtonHTMLAttributes } from 'react'

type ContinueButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function ContinueButton({
  className = '',
  children = 'Continue',
  type = 'button',
  ...props
}: ContinueButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-[48px] min-w-[160px] items-center justify-center rounded-full bg-ppg-orange px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-ppg-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
