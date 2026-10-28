import { Search } from 'lucide-react'
import { useId } from 'react'
import {
  extractAuMobileLocalDigits,
  formatAuMobileDisplay,
  isCompleteAuMobile,
} from './auMobileInput'
import { FormField } from './FormField'

type VerifiedMobileFieldProps = {
  value: string
  onChange: (value: string) => void
  onLookup?: (phone: string) => void
  error?: string | null
}

export function VerifiedMobileField({
  value,
  onChange,
  onLookup,
  error,
}: VerifiedMobileFieldProps) {
  const phoneInputId = useId()

  function handleLookupClick() {
    const trimmed = value.trim()
    if (!isCompleteAuMobile(trimmed)) {
      onLookup?.('')
      return
    }
    onLookup?.(trimmed)
  }

  return (
    <FormField
      label={
        <>
          Mobile number <span className="text-red-500">*</span>
        </>
      }
      htmlFor={phoneInputId}
      error={error}
    >
      <div className="relative w-full">
        <input
          id={phoneInputId}
          name="mobile"
          type="tel"
          autoComplete="tel"
          value={value}
          onChange={(event) => {
            onChange(
              formatAuMobileDisplay(
                extractAuMobileLocalDigits(event.target.value),
              ),
            )
          }}
          onFocus={(event) => {
            const len = event.currentTarget.value.length
            requestAnimationFrame(() => {
              event.currentTarget.setSelectionRange(len, len)
            })
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleLookupClick()
            }
          }}
          className="w-full rounded-[10px] border border-ppg-border bg-white py-2.5 pl-4 pr-11 text-sm text-black outline-none transition-colors placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
        />
        <button
          type="button"
          aria-label="Look up saved sender details"
          onClick={handleLookupClick}
          className="absolute right-1 top-1/2 flex size-[34px] -translate-y-1/2 items-center justify-center rounded-lg text-ppg-orange transition-colors hover:bg-[#fff5f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ppg-orange"
        >
          <Search className="size-[18px]" strokeWidth={2.25} aria-hidden />
        </button>
      </div>
    </FormField>
  )
}
