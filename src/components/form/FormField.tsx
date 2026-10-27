import type { ReactNode } from 'react'

type FormFieldProps = {
  label: ReactNode
  htmlFor?: string
  children: ReactNode
  className?: string
  error?: string | null
}

export function FormField({
  label,
  htmlFor,
  children,
  className = '',
  error,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={htmlFor} className="text-xs font-bold text-black">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
