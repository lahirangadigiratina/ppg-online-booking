import { CircleCheck, Info } from 'lucide-react'
import { useEffect, useId, useState } from 'react'

type VerifiedMobileFieldProps = {
  phoneNumber: string
}

export function VerifiedMobileField({ phoneNumber }: VerifiedMobileFieldProps) {
  const inputId = useId()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(phoneNumber)
  const [verified, setVerified] = useState(true)

  useEffect(() => {
    setValue(phoneNumber)
  }, [phoneNumber])

  const inputClassName = `w-full rounded-[10px] border border-ppg-border bg-white px-4 py-3.5 text-base text-black outline-none transition-colors placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20 ${
    editing ? '' : 'cursor-default bg-[#fafafa] text-ppg-label focus:border-ppg-border focus:ring-0'
  } ${!editing && verified ? 'pr-[7.5rem]' : ''}`

  function finishEditing() {
    setEditing(false)
    if (value.trim() !== phoneNumber.trim()) {
      setVerified(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <label htmlFor={inputId} className="text-sm text-ppg-label">
          Mobile number
        </label>
        <Info
          className="size-4 text-ppg-orange"
          strokeWidth={2}
          aria-label="Mobile number verified via SMS"
        />
      </div>

      <div className="flex items-start gap-2">
        <div className="relative min-w-0 flex-1">
          <input
            id={inputId}
            name="mobile"
            type="tel"
            autoComplete="tel"
            readOnly={!editing}
            value={value}
            placeholder="+61 400 000 000"
            onChange={(event) => setValue(event.target.value)}
            onBlur={() => {
              if (editing) finishEditing()
            }}
            className={inputClassName}
          />
          {!editing && verified ? (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1 text-sm font-medium text-ppg-verified">
              <CircleCheck className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
              Verified
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => {
            if (editing) {
              finishEditing()
            } else {
              setEditing(true)
              requestAnimationFrame(() => {
                document.getElementById(inputId)?.focus()
              })
            }
          }}
          className="mt-0.5 shrink-0 rounded-full border border-ppg-border bg-white px-4 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
        >
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>

    </div>
  )
}
