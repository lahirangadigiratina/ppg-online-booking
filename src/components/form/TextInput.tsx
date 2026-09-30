import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInput({ className = '', ...props }: TextInputProps) {
  return (
    <input
      className={`w-full rounded-[10px] border border-ppg-border bg-white px-4 py-3.5 text-base text-black outline-none transition-colors placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20 ${className}`}
      {...props}
    />
  )
}
