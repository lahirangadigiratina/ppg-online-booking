import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

/** Only 2 km and 5 km — no 10 km option */
export const COLLECT_RADIUS_OPTIONS = ['2 km', '5 km'] as const
export type CollectRadiusOption = (typeof COLLECT_RADIUS_OPTIONS)[number]

const RADIUS_OPTION_LIST: CollectRadiusOption[] = ['2 km', '5 km']

function isCollectRadiusOption(value: string): value is CollectRadiusOption {
  return RADIUS_OPTION_LIST.includes(value as CollectRadiusOption)
}

/** Keeps e.g. "5 km" on one line in a narrow control */
function radiusLabel(option: CollectRadiusOption) {
  return option.replace(' ', '\u00A0')
}

type CollectRadiusSelectProps = {
  id?: string
  value: CollectRadiusOption
  onChange: (value: CollectRadiusOption) => void
  compact?: boolean
}

export function CollectRadiusSelect({
  id: idProp,
  value,
  onChange,
  compact = false,
}: CollectRadiusSelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const listboxId = `${id}-listbox`
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isCollectRadiusOption(value)) return
    onChange('2 km')
  }, [value, onChange])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  if (compact) {
    return (
      <div
        ref={containerRef}
        className="relative h-[38px] w-[92px] shrink-0"
      >
        <button
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => setOpen((previous) => !previous)}
          className="box-border flex h-full w-full items-center justify-between gap-1 rounded-full border border-ppg-border bg-white px-2 text-left text-xs font-semibold leading-none text-black shadow-none outline-none transition-colors focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
        >
          <span className="min-w-0 truncate whitespace-nowrap">
            {radiusLabel(value)}
          </span>
          <ChevronDown
            className={`size-3.5 shrink-0 text-black transition-transform ${open ? 'rotate-180' : ''}`}
            strokeWidth={2}
            aria-hidden
          />
        </button>

        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={id}
            className="absolute left-0 right-0 z-[110] mt-1.5 overflow-hidden rounded-xl border border-ppg-border bg-white py-0.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          >
            {RADIUS_OPTION_LIST.map((option) => {
              const isSelected = option === value
              return (
                <li key={option} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-label={option}
                    onClick={() => {
                      onChange(option)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-1 whitespace-nowrap px-2 py-2 text-left text-xs font-semibold leading-none text-black transition-colors ${
                      isSelected ? 'bg-[#fff5f2]' : 'hover:bg-[#fafafa]'
                    }`}
                  >
                    <span className="min-w-0 truncate">{radiusLabel(option)}</span>
                    {isSelected ? (
                      <Check
                        className="size-3.5 shrink-0 text-black"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    ) : (
                      <span className="size-3.5 shrink-0" aria-hidden />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-full border border-ppg-border bg-white px-5 py-3.5 text-left text-base font-semibold text-black shadow-[0_2px_12px_rgba(0,0,0,0.06)] outline-none transition-colors focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
      >
        <span>{value}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-black transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-[110] mt-2 w-full overflow-hidden rounded-2xl border border-ppg-border bg-white py-1 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        >
          {RADIUS_OPTION_LIST.map((option) => {
            const isSelected = option === value
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-2 whitespace-nowrap px-5 py-3.5 text-left text-base font-semibold text-black transition-colors ${
                    isSelected ? 'bg-[#fff5f2]' : 'hover:bg-[#fafafa]'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected ? (
                    <Check className="size-5 shrink-0 text-black" strokeWidth={2.5} />
                  ) : (
                    <span className="size-5 shrink-0" aria-hidden />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
