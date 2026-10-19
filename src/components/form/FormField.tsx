import type { ReactNode } from 'react'

type FormFieldProps = {
  label: ReactNode
  htmlFor?: string
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={htmlFor} className="text-xs font-normal text-ppg-label">
        {label}
      </label>
      {children}
    </div>
  )
}
