import { Map, Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

type BookingSearchFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  wrapperClassName?: string
  /** Map control inside the field on the right (step 1 store search) */
  showMapButton?: boolean
  onMapClick?: () => void
}

export function BookingSearchField({
  className = '',
  wrapperClassName = '',
  showMapButton = false,
  onMapClick,
  ...props
}: BookingSearchFieldProps) {
  return (
    <div className={`relative w-full ${wrapperClassName}`.trim()}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ppg-label"
        strokeWidth={2}
        aria-hidden
      />
      <input
        type="search"
        className={`booking-search-input ${showMapButton ? 'booking-search-input-with-map' : ''} ${className}`.trim()}
        {...props}
      />
      {showMapButton ? (
        <button
          type="button"
          aria-label="View locations on map"
          onClick={onMapClick}
          className="absolute right-1 top-1/2 flex size-[34px] -translate-y-1/2 items-center justify-center rounded-lg border border-ppg-border bg-[#fafafa] text-ppg-orange transition-colors hover:border-[#d0d0d0] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ppg-orange"
        >
          <Map className="size-[18px]" strokeWidth={2} aria-hidden />
        </button>
      ) : null}
    </div>
  )
}
