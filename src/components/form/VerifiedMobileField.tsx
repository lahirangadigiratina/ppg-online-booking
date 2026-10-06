import { CircleCheck, Pencil } from 'lucide-react'
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

  function startEditing() {
    setEditing(true)
    requestAnimationFrame(() => {
      document.getElementById(inputId)?.focus()
    })
  }

  function finishEditing() {
    setEditing(false)
    if (value.trim() !== phoneNumber.trim()) {
      setVerified(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <label
          htmlFor={editing ? inputId : undefined}
          className="text-sm text-ppg-label"
        >
          Mobile number
        </label>
        {!editing ? (
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ppg-orange transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
          >
            <Pencil className="size-3.5" strokeWidth={2} aria-hidden />
            Edit
          </button>
        ) : null}
      </div>

      {editing ? (
        <div className="flex items-center rounded-[10px] border border-ppg-border bg-white focus-within:border-ppg-orange focus-within:ring-2 focus-within:ring-ppg-orange/20">
          <input
            id={inputId}
            name="mobile"
            type="tel"
            autoComplete="tel"
            value={value}
            placeholder="+61 400 000 000"
            onChange={(event) => setValue(event.target.value)}
            className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 text-base text-black outline-none placeholder:text-[#b8b8b8] focus:ring-0"
          />
          <button
            type="button"
            onClick={finishEditing}
            className="shrink-0 px-4 py-3.5 text-sm font-semibold text-ppg-orange transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-lg font-semibold tracking-tight text-black">{value}</p>
            {verified ? (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-ppg-verified">
                <CircleCheck className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
                Verified
              </span>
            ) : null}
          </div>
          <input type="hidden" name="mobile" value={value} />
        </>
      )}
    </div>
  )
}
