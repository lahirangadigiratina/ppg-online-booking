import type { ButtonHTMLAttributes } from 'react'

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function BackButton({
  className = '',
  children = 'Back',
  type = 'button',
  ...props
}: BackButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-12 min-h-[48px] min-w-0 shrink-0 items-center justify-center rounded-full border border-ppg-border bg-white px-6 text-base font-semibold text-black transition-colors hover:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
